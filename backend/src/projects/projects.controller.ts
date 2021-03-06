import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../sentry/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projects: ProjectsService) {}

    @Get()
    findAll(): string {
        return this.projects.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): string {
        return this.projects.findOne(id);
    }
}
