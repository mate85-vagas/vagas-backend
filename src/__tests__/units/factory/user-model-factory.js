import User from '../../../models/UserModel';
import Chance from 'chance';

const chance = new Chance();
const userModelMock = new User();

userModelMock.set('id', chance.integer({ min: 1 }));
userModelMock.set('email', chance.string());
userModelMock.set('name', chance.string());
userModelMock.set('password', chance.string());

export { userModelMock }; 