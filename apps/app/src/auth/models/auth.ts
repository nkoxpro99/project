import { Role } from '@/enums/role.enum';

export type AuthUser = {
  id: number;
  name: string;
  role: Role;
};
