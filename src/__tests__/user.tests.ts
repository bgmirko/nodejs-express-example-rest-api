import db from '../database/models';
import bcrypt from 'bcryptjs';
import {UserService} from '../services/userService';
import {User} from '../database/modelsTypes';

describe('User Management', () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true});
    await db.User.create({
      uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
      firstName: 'Petar',
      lastName: 'Petrovic',
      password: await bcrypt.hash('test123', 12),
      email: 'petar@gmail.com',
      username: 'petar80',
      active: true,
      role: 'Admin',
    });
  });

  it('Find user by his username should return user Petar', async () => {
    const user: User = await UserService.getUserByUsername('petar80');
    expect(user.username === 'petar80').toBeTruthy();
  });

  it("After user is deleted, it shouldn't be possible to fetch him", async () => {
    const user: User = await UserService.getUserByUsername('petar80');
    await UserService.softDeleteUser(user.uuid);
    const userRefetch = await UserService.getUserByUsername('petar80');
    expect(userRefetch).toBeNull();
  });

  it('After user email is changed in db to new@gmail.com user should have new@gmail.com email address on fetch', async () => {
    const user: User = await UserService.getUserByUsername('petar80');
    const userData = {
      email: 'new@gmail.com',
    };
    const updatedUser = await UserService.updateUser(user.uuid, userData);
    expect(updatedUser.email).toBe('new@gmail.com');
  });

  it('When user is deactivated he should be deactivated', async () => {
    const user: User = await UserService.getUserByUsername('petar80');
    await UserService.deactivateUser(user.uuid);
    const userRefetch: User = await UserService.getUserByUsername('petar80');
    expect(userRefetch.active).toBeFalsy();
  });
});
