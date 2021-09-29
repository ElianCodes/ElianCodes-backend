import { Controller, Get } from '@nestjs/common';
import { Technology } from 'models/interfaces/Technology';
import { TechnologiesService } from './technologies.service';

@Controller('technologies')
export class TechnologiesController {
    constructor(private readonly technologiesService: TechnologiesService) {}

    @Get()
    async getAllTechnologies(): Promise<Technology[]> {
        return this.technologiesService.getAllTechnologies()
    }
}
