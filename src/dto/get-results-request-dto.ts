import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetResultsRequestDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;
}
