import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { EnterpriseSchema } from "./model/enterprise.model";
import { EnterpriseService } from './enterprise.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Enterprise', schema: EnterpriseSchema },
    ]),
  ],
  providers: [EnterpriseService],
})
export class EnterpriseModule {}
