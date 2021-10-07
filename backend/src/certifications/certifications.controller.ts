import { Controller, Get, Param } from '@nestjs/common';
import { Certification } from 'models/interfaces/Certification';
import { CertificationsService } from './certifications.service';
import { UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../sentry/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('certifications')
export class CertificationsController {
    constructor(private readonly certifications: CertificationsService) {}

    @Get()
    async findAll(): Promise<Certification[]> {
        return this.certifications.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id') id): Promise<Certification> {
        return this.certifications.findOne(id);
    }
}
