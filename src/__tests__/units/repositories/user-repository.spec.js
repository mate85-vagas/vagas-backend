import repository from '../../../repositories/UserRepository';
import User from '../../../models/UserModel';
import { jest } from '@jest/globals';
import { userModelMock } from '../factory/user-model-factory';

describe('Users Context', () => {
  it('getUserById: should find a user by id', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(userModelMock));
    const user = await repository.getUserById(userModelMock.get('id'));
    expect(user).toBeDefined();
  });

  it('getUserById: should return empty user object', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const user = await repository.getUserById(userModelMock.get('id'));
    expect(user).toBeNull();
  });

  it('createUser: should create user', async () => {
    jest.spyOn(User, 'create').mockResolvedValueOnce(Promise.resolve(userModelMock));
    try {
      await repository.createUser('', userModelMock.get('id'));
      expect.anything();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('createUser: should throw error', async () => {
    jest.spyOn(User, 'create').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.createUser('', userModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();
    }
    });
  });

  it('updateUser: should update user', async () => {
    jest.spyOn(User, 'update').mockResolvedValueOnce(Promise.resolve(userModelMock));
    try {
      await repository.updateUser('', userModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('updateUser: should throw error', async () => {
    jest.spyOn(User, 'update').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.updateUser('', userModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

    it('deleteUser: should delete user', async () => {
    jest.spyOn(User, 'destroy').mockResolvedValueOnce(Promise.resolve(userModelMock));
    try {
      await repository.deleteUser(userModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

    it('deleteUser: should throw error', async () => {
    jest.spyOn(User, 'destroy').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.deleteUser(userModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('getAllUsers: should find all users', async () => {
    jest.spyOn(User, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve([userModelMock]));
    const user = await repository.getAllUsers(userModelMock.get('id'));
    expect(user).toBeDefined();
  });

  it('getAllUsers: should return empty users object', async () => { 
    jest.spyOn(User, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(null));
    const user = await repository.getAllUsers(userModelMock.get('id'));
    expect(user).toBeNull();
  });

  it('getUserByEmail: should find a user by email', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(userModelMock));
    const user = await repository.getUserByEmail(userModelMock.get('email'));
    expect(user).toBeDefined();
  });

  it('getUserByEmail: should return empty user object', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const user = await repository.getUserByEmail(userModelMock.get('email'));
    expect(user).toBeNull();
  });

  it('checkExistentEmail: should find a existent email', async () => {
    jest.spyOn(User, 'count').mockResolvedValueOnce(Promise.resolve(userModelMock));
    const user = await repository.checkExistentEmail(userModelMock.get('email'));
    expect(user).toBeDefined();
  });

  it('checkExistentEmail: should return empty email object', async () => {
    jest.spyOn(User, 'count').mockResolvedValueOnce(Promise.resolve(null));
    const user = await repository.checkExistentEmail(userModelMock.get('email'));
    expect(user).toBeNull();
  });


