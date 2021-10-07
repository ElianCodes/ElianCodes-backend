import { Controller, Get, NotFoundException } from '@nestjs/common';
import { AnalyticsPage } from 'models/interfaces/AnalyticsPage';
import { AnalyticsService } from './analytics.service';
import { UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../sentry/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get()
    async displayForNotFound(): Promise<AnalyticsPage[]> {
        return await this.analyticsService.getMostVisitedPagesForNotFound();
    }
}
