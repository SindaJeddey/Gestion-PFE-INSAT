import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enterprise } from './model/enterprise.model';
import { NewEnterpriseDto } from './model/dto/new-enterprise.dto';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectModel('Enterprise') private enterpriseModel: Model<Enterprise>,
  ) {}

  async addEnterprise(newEnterprise: NewEnterpriseDto): Promise<Enterprise> {
    const enterprise = new this.enterpriseModel(newEnterprise);
    return await enterprise.save();
  }

  async getAllEnterprises(): Promise<Enterprise[]> {
    return this.enterpriseModel.find().exec();
  }
}

