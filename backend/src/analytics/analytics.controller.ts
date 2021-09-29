import { Controller, Get } from '@nestjs/common';
import { AnalyticsPage } from 'models/interfaces/AnalyticsPage';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get()
    async displayForNotFound(): Promise<AnalyticsPage[]> {
        return await this.analyticsService.getMostVisitedPagesForNotFound();
    }
}
