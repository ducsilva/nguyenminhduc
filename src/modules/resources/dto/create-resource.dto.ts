import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { File } from 'multer';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    default: '',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    default: '',
  })
  content: string;
  @ApiProperty({
    name: 'banner',
    description: 'Select an banner',
    required: true,
    type: String,
    format: 'binary',
  })
  banner: File;
}
