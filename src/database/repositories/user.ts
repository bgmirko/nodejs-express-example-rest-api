import {BaseRepository} from './_base';
import User from '../models/user';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  // Add additional user-specific methods if needed
}

export default UserRepository;