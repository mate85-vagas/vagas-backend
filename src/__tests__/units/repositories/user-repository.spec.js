import repository from '../../../repositories/UserRepository';
import User from '../../../models/UserModel';
import { jest } from '@jest/globals';
import { userModelMock } from '../factory/user-model-factory';

describe('Users Context', () => {
  it('should find a user by id', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(userModelMock));
    const user = await repository.getUserById(userModelMock.get('id'));
    expect(user).toBeDefined();
  });

  it('should return empty user object', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const user = await repository.getUserById(userModelMock.get('id'));
    expect(user).toBe(null);
  });
});

describe('Find user by email', () => {
    it('should find an user by email', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(userModelMock));
      const user = await repository.getUserByEmail(userModelMock.get('email'));
      expect(user).toBeDefined();
    });
  
    it('should return an empty user email object', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
      const user = await repository.getUserByEmail(userModelMock.get('email'));
      expect(user).toBe(null);
    });
  });

describe('Check Email', () => {
    it('should be able to check existent email', async () => {
      jest.spyOn(User, 'count').mockResolvedValueOnce(Promise.resolve(userModelMock));
      const user = await repository.checkExistentEmail(userModelMock.get('email'));
      expect(user).toBeDefined();
    });
  
    it('should return an empty user object', async () => {
      jest.spyOn(User, 'count').mockResolvedValueOnce(Promise.resolve(null));
      const user = await repository.checkExistentEmail(userModelMock.get('email'));
      expect(user).toBe(null);
    });
  });

describe('Create user', () => {
    it('should be able to create a new user', async () => {
      jest.spyOn(User, 'create').mockResolvedValueOnce(Promise.resolve(userModelMock));
      const user = await repository.createUser(userModelMock);
      expect(user).toBeDefined();
    });
  
    it('should return an empty user object', async () => {
      jest.spyOn(User, 'create').mockResolvedValueOnce(Promise.resolve(null));
      const user = await repository.createUser(userModelMock);
      expect(user).toBe(null);
    });
  });

describe('Get all users', () => {
    it('should be able to get all users', async () => {
      jest.spyOn(User, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(userModelMock));
      const user = await repository.getAllUsers(userModelMock);
      expect(user).toBeDefined();
    });
  
    it('should return an empty user object', async () => {
      jest.spyOn(User, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(null));
      const user = await repository.getAllUsers(userModelMock);
      expect(user).toBe(null);
    });
  });

describe('Delete an user', () => {
    it('should be able to delete an user', async () => {
      jest.spyOn(User, 'destroy').mockResolvedValueOnce(Promise.resolve(null));
      const user = await repository.deleteUser(userModelMock.get('id'));
      expect(user).toBeUndefined();
    });
  
    it('should return an empty user object', async () => {
      jest.spyOn(User, 'destroy').mockResolvedValueOnce(Promise.resolve(userModelMock));
      const user = await repository.deleteUser(userModelMock.get('id'));
      expect(user).toBeUndefined();
    });
  });

describe('Update user', () => {
    it('should be able to update an user', async () => {
      jest.spyOn(User, 'update').mockResolvedValueOnce(Promise.resolve(userModelMock));
      const user = await repository.updateUser(userModelMock.get('id'));
      expect(user).toBeUndefined();
    });
  
    it('should return an empty user object', async () => {
      jest.spyOn(User, 'update').mockResolvedValueOnce(Promise.resolve(null));
      const user = await repository.updateUser(userModelMock.get('id'));
      expect(user).toBeUndefined();
    });
  });
