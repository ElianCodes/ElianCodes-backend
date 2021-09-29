import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Technology } from 'models/interfaces/Technology';
import { Model } from 'mongoose';

@Injectable()
export class TechnologiesService {
    constructor(@InjectModel('Technology') private readonly technologyModel: Model<Technology>) {}

    async getAllTechnologies(): Promise<Technology[]> {
        return await this.technologyModel.find();
    }
}
