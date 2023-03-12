import { Role } from '@prisma/client';

export interface IUserCredential {
  email: string;
  password: string;
}

export interface AuthTicket {
  email: string;
  id: string;
  roles: Role[];
}
