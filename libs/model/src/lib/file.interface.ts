import { FileType } from '@thepro/model';

export interface ICreateFile {
  name: string;
  location: string;
  type: FileType;
}
