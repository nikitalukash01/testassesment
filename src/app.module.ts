import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConnectorModule } from './dbConectorModule/dbConnnector.module';
import { TestAssesmentModule } from './test-assesment-module/test-assesment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbConnectorModule,
    TestAssesmentModule,
  ],
})
export class AppModule {}
