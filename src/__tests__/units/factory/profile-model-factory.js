import Profile from '../../../models/ProfileModel.js';
import Chance from 'chance';

const chance = new Chance();
const profileModelMock = new Profile();

profileModelMock.set('id', chance.integer({ min: 1 }));
profileModelMock.set('birthDate', chance.date());
profileModelMock.set('scholarity', chance.string({ max: 30 }));
profileModelMock.set('knowledge', chance.string());
profileModelMock.set('technologies', chance.string());
profileModelMock.set('languages', chance.string({ max: 255 }));
profileModelMock.set('linkResume', chance.string({ max: 255 }));
profileModelMock.set('searchable', chance.bool());

export { profileModelMock };
