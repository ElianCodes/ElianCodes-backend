import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnologySchema } from 'models/schemas/Technology';

@Module({
	imports: [MongooseModule.forFeature([{name: "Technology", schema: TechnologySchema}])],
  providers: [TechnologiesService],
	controllers: [TechnologiesController]
})
export class TechnologiesModule {}
