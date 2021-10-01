import { Injectable } from '@nestjs/common';
import { AnalyticsPage } from 'models/interfaces/AnalyticsPage';
import { MostVisitedPages, Credentials, Page } from '@elianvancutsem/mostvisitedpages'

@Injectable()
export class AnalyticsService {
    propertyId: string
    mostVisitedPages: MostVisitedPages;
    credentials: Credentials = {
        client_email: process.env.GA_EMAIL,
        private_key: process.env.GA_KEY
    }

    constructor() {
        this.propertyId = process.env.GA_PROPERTY
        this.mostVisitedPages = new MostVisitedPages(this.credentials, this.propertyId);
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
        const rawPages: Page[] = await this.mostVisitedPages.getPageViews(4)
        const result: AnalyticsPage[] = rawPages.map((page: Page) => {
            const newPage: AnalyticsPage = {
                type: this.defineTypeForPage(page.url),
                title: this.morphTitleForOldHeading(page.title),
                link: page.url,
                views: page.views
            }
            return newPage
        })
        return result 
    }
}
