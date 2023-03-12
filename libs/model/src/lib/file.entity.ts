import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@thepro/database';

@Injectable()
export class FileEntity {
  constructor(private readonly databaseService: DatabaseService) { }

  async getFileById(id: string) {
    return await this.databaseService.file.findUnique({
      where: {
        id
      }
    })
  }
}
