import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Apple' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 1500 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
}