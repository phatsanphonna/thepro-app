import { SetMetadata } from '@nestjs/common';
import { Role } from '@thepro/database';

export const Roles = (roles: Role[]) => SetMetadata('roles', roles);
