import { Injectable } from '@nestjs/common';
import { CloudStorage } from './cloud-storage.service';
import { parse } from 'path';
import { FileType } from '@thepro/database';
import { Duplex } from 'stream';

interface IFileMetadata {
  type: FileType;
  title: string;
}

@Injectable()
export class StorageService extends CloudStorage {
  private parseFileExtension(originalname: string) {
    return parse(originalname).ext;
  }

  private setFilename(title: string, ext: string): string {
    return `${title}${ext}`
      .replace(/^\.+/g, '')
      .replace(/^\/+/g, '')
      .replace(/\s+/g, '_');
  }

  async getSignedUrl(contentUrl: string) {
    const [url] = await this.bucket()
      .file(contentUrl)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
      });

    return url;
  }

  getFile(contentUrl: string) {
    return this.bucket().file(contentUrl);
  }

  private bufferToStream(buffer: Buffer) {
    const tmp = new Duplex();
    tmp.push(buffer);
    tmp.push(null);
    return tmp;
  }

  async uploadFile(uploadFile, metadata: IFileMetadata) {
    console.log(uploadFile);

    const { title, type } = metadata;

    let destination: string = this.setFilename(
      title,
      this.parseFileExtension(uploadFile.originalname)
    );

    if (type === FileType.VIDEO) {
      destination = `videos/${destination}`;
    } else {
      destination = `files/${destination}`;
    }

    const file = this.getFile(destination);

    const stream = this.bufferToStream(uploadFile.buffer).pipe(
      file.createWriteStream({
        contentType: uploadFile.mimetype,
        gzip: true,
        resumable: false,
      })
    );

    return { stream, destination };
  }
}
