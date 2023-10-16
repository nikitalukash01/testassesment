import { Module } from '@nestjs/common';
import { TestAssesmentController } from './test-assesment.controller';
import { TestAssesmentService } from './test-assesment.service';

@Module({
  controllers: [TestAssesmentController],
  providers: [TestAssesmentService],
})
export class TestAssesmentModule {}
