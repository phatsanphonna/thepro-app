import { FileType } from '@prisma/client';

export interface ICreateFile {
  name: string;
  location: string;
  type: FileType;
}
