import Profile from '../../../models/ProfileModel.js';
import User from '../../../models/UserModel.js';
import Chance from 'chance';

const chance = new Chance();

const createProfileModelMock = (basic) => {
  const profileModelMock = new Profile();

  profileModelMock.set('id', chance.integer({ min: 1 }));
  profileModelMock.set('birthDate', chance.date());
  profileModelMock.set('scholarity', chance.string({ max: 30 }));
  profileModelMock.set('knowledge', chance.string());
  profileModelMock.set('technologies', chance.string());
  profileModelMock.set('languages', chance.string({ max: 255 }));
  profileModelMock.set('linkResume', chance.string({ max: 255 }));
  profileModelMock.set('searchable', chance.bool());
  profileModelMock.set('userId', chance.integer({ min: 1 }));

  //Include user model to profile mock if basic is false
  if (!basic) {
    const userModelMock = new User();
    userModelMock.set('name', chance.string({ max: 255 }));
    userModelMock.set('email', chance.email());
    profileModelMock.dataValues.user = userModelMock;
    profileModelMock._previousDataValues.user = undefined;
  }

  return profileModelMock;
};

export default { createProfileModelMock };
