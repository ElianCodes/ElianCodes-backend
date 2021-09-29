import { Injectable } from '@nestjs/common';
import { AnalyticsPage } from 'models/interfaces/AnalyticsPage';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

@Injectable()
export class AnalyticsService {
    propertyId: string
    analyticsDataClient: BetaAnalyticsDataClient;
    options: any = {
        credentials: {
        client_email: process.env.GA_EMAIL,
        private_key: process.env.GA_KEY
        }
    }
    
    constructor() {
        this.propertyId = process.env.GA_PROPERTY
        this.analyticsDataClient = new BetaAnalyticsDataClient(this.options);
    }

    defineTypeForPage (rawType: string): string {
        const basestring: string = "www.elian.codes/blog/";
        return rawType.substring(0, basestring.length) == basestring && rawType.length > basestring.length ? 'article' : 'page'
    }

    morphTitleForOldHeading = (rawTitle: string): string => {
        const heading = "Elian Van Cutsem |";
        if (rawTitle.startsWith(heading)) {
            return rawTitle.substring(heading.length + 1)
        }
        return rawTitle
    }
    
    async getMostVisitedPagesForNotFound(): Promise<AnalyticsPage[]>{
        const response: AnalyticsPage[] = [];
        const [report] = await this.analyticsDataClient.runReport({
            property: `properties/${this.propertyId}`,
            dateRanges: [{ startDate: '90daysAgo', endDate: 'today' }],
            dimensions: [{ name: 'fullPageUrl' }, { name: 'pageTitle' }],
            metrics: [{ name: 'engagedSessions' }],
            limit: 4
        });
        report.rows.forEach(row => {
            const record: AnalyticsPage = {
                type: this.defineTypeForPage(row.dimensionValues[0].value),
                title: this.morphTitleForOldHeading(row.dimensionValues[1].value),
                link: row.dimensionValues[0].value,
                views: Number.parseInt(row.metricValues[0].value)
            }
            response.push(record)
        });
        return response
    }
}
