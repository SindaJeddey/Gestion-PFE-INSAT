import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterpriseSchema } from './model/enterprise.model';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Enterprise', schema: EnterpriseSchema },
    ]),
  ],
  exports: [EnterprisesService],
  providers: [EnterprisesService],
  controllers: [EnterprisesController],
})
export class EnterprisesModule {}
