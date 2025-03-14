import { UserModel } from '@/models/user.model';

import { Service } from './service';

class UserService extends Service<UserModel, UserModel, UserModel> {
  constructor() {
    super();
    this.setBaseURL('user');
  }
}

export default new UserService();
