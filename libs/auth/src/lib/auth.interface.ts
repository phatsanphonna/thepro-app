import { Role } from '@thepro/database';

export interface IUserCredential {
  email: string;
  password: string;
}

export interface AuthTicket {
  email: string;
  id: string;
  roles: Role[];
}
