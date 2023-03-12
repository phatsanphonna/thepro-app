import { Storage } from '@google-cloud/storage';

export class CloudStorage extends Storage {
  constructor() {
    super({ keyFilename: '../../cloud-storage-key.json' })
  }

  override bucket() {
    return super.bucket('thepro-tutor-files')
  }
}
