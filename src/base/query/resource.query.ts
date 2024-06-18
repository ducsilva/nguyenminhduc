import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ResourceQueryDto {
  @ApiProperty({
    name: 'limit',
    description: 'Limit of this query',
    required: false,
    default: 10,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @ApiProperty({
    name: 'page',
    description: 'Page for this query',
    default: 1,
    required: false,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  page: number;
}
