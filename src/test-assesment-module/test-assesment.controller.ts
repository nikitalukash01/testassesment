import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CommonInterceptor } from './interceptor';
import { TestAssesmentService } from './test-assesment.service';
import { GetResultsRequestDTO } from '../dto/get-results-request-dto';
import { GetResultsResponseDTO } from '../dto/get-results-response-dto';

@UseInterceptors(CommonInterceptor)
@Controller('results')
export class TestAssesmentController {
  constructor(private readonly testAssesmentService: TestAssesmentService) {}

  @Get()
  async getResults(
    @Query() query: GetResultsRequestDTO,
  ): Promise<GetResultsResponseDTO> {
    console.log(process.env);
    const result = await this.testAssesmentService.getResult(query.city);

    return result;
  }
}
