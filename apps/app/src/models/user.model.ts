import { Role } from '@/enums/role.enum';

export type UserModel = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  ioc: string;
  role: Role;
};
