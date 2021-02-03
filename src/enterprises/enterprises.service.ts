import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enterprise } from './model/enterprise.model';
import { EnterpriseDto } from './model/dto/enterprise.dto';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectModel('Enterprise') private enterpriseModel: Model<Enterprise>,
  ) {}

  async addEnterprise(newEnterprise: EnterpriseDto): Promise<Enterprise> {
    const enterprise = new this.enterpriseModel(newEnterprise);
    return await enterprise.save();
  }

  async getAllEnterprises(): Promise<Enterprise[]> {
    return this.enterpriseModel.find().exec();
  }

  async getEnterprise(enterpriseId: string): Promise<Enterprise> {
    const enterprise = await this.enterpriseModel.findById(enterpriseId);
    if (!enterprise)
      throw new NotFoundException(`Enterprise id ${enterpriseId} not found`);
    return enterprise;
  }
}
