import { Injectable } from '@nestjs/common';
import { FileEntity } from '@thepro/model';
import { StorageService } from '@thepro/storage';
import { UploadedFileDto } from './dto/uploaded-file.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly storageService: StorageService,
    private readonly fileEntity: FileEntity
  ) {}

  async getFile(id: string) {
    const file = await this.fileEntity.getFileById(id);
    const storedFile = this.storageService.getFile(file.location);

    return { file, storedFile };
  }

  async uploadFile(file, uploadFileDto: UploadedFileDto) {
    const { title, type } = uploadFileDto;

    const { stream, destination } = await this.storageService.uploadFile(file, {
      title: uploadFileDto.title,
      type: uploadFileDto.type,
    });

    const fileDB = await this.fileEntity.createFile({
      name: title,
      location: destination,
      type,
    });

    return { stream, fileDB };
  }
}
