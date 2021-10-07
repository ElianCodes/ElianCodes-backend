import { Controller, Get } from '@nestjs/common';
import { Technology } from 'models/interfaces/Technology';
import { TechnologiesService } from './technologies.service';
import { UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../sentry/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('technologies')
export class TechnologiesController {
    constructor(private readonly technologiesService: TechnologiesService) {}

    @Get()
    async getAllTechnologies(): Promise<Technology[]> {
        return this.technologiesService.getAllTechnologies()
    }
}
