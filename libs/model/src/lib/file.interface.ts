import { FileType } from '@thepro/database';

export interface ICreateFile {
  name: string;
  location: string;
  type: FileType;
}
