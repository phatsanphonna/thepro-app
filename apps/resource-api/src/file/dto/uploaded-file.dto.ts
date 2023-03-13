import { FileType } from '@thepro/database';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class UploadedFileDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  contentURL?: string;

  @IsNotEmpty()
  @IsEnum(FileType)
  type: FileType;
}
