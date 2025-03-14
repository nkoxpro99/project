import { Role } from '@/enums/role.enum';

export type AuthenticateResponse = {
  id: number;
  name: string;
  role: Role;
  jwtToken: string;
};
