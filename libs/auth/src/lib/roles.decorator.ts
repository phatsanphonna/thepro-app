import { SetMetadata } from '@nestjs/common';
import { Role } from '@thepro/model';

export const Roles = (roles: Role[]) => SetMetadata('roles', roles);
