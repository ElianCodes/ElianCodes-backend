import { Injectable } from '@nestjs/common';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

@Injectable()
export class AppService {
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

  getHello(): string {
    return 'Welcome to the ElianCodes API';
  }

  checkHealth(): string {
    return 'Health seems fine'
  }

  async runReport(): Promise<any> {
    let response = []
    const [report] = await this.analyticsDataClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [{ startDate: '90daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'fullPageUrl' }, { name: 'pageTitle' }],
      metrics: [{ name: 'engagedSessions' }],
      limit: 4
    });

    report.rows.forEach(row => {
      const basestring: string = "www.elian.codes/blog/";
      const defineType = (rawType: string): string => {
        return rawType.substring(0, basestring.length) == basestring && rawType.length > basestring.length ? 'article' : 'page'
      }
      const morphTitle = (rawTitle: string): string => {
        const heading = "Elian Van Cutsem |";
        if (rawTitle.startsWith(heading)) {
          return rawTitle.substring(heading.length + 1)
        }
        return rawTitle
      }

      const record = {
        type: defineType(row.dimensionValues[0].value),
        title: morphTitle(row.dimensionValues[1].value),
        link: row.dimensionValues[0].value,
        views: row.metricValues[0].value
      }
      response.push(record)
    });
    return response
  }
}
