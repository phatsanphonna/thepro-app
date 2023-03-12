import { Injectable } from '@nestjs/common';
import { CloudStorage } from './cloud-storage.service';

@Injectable()
export class StorageService extends CloudStorage {
  async getSignedUrl(contentUrl: string) {
    const [url] = await this.bucket().file(contentUrl).getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
    })

    return url
  }

  getFile(contentUrl: string) {
    return this.bucket().file(contentUrl)
  }
}
