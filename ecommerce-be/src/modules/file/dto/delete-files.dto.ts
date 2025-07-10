import { IsArray, IsString, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteFilesDto {
  @ApiProperty({
    description: 'Array of file keys to delete',
    example: ['product/image1.jpg', 'product/image2.jpg'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  keys: string[];
}
