import { Storage } from '@google-cloud/storage';
import { join } from 'path';

export class CloudStorage extends Storage {
  constructor() {
    super({ keyFilename: join(__dirname, './assets/cloud-storage-key.json') });
  }

  override bucket() {
    return super.bucket('thepro-tutor-files');
  }
}
