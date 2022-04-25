import repository from '../../../repositories/ProfileRepository';
import Profile from '../../../models/ProfileModel';
import { jest } from '@jest/globals';
import factory from '../factory/profile-model-factory';
import Chance from 'chance';
import { ProfileAttrs } from '../../../models/ProfileAttrs';

const chance = new Chance();

describe('Profile Context', () => {
  it('should find a profile by id', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'findOne').mockResolvedValueOnce(Promise.resolve(profileModelMock));
    const profile = await repository.getProfileById(profileModelMock.get('id'));
    expect(profile).toBeDefined();
  });

  it('should return empty profile object', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const profile = await repository.getProfileById(profileModelMock.get('id'));
    expect(profile).toBe(null);
  });

  it('should find a profile by userId', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'findOne').mockResolvedValueOnce(Promise.resolve(profileModelMock));
    const profile = await repository.getProfileByUserId(profileModelMock.get('userId'));
    expect(profile).toBeDefined();
  });

  it('should return empty profile object', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const profile = await repository.getProfileByUserId(profileModelMock.get('userId'));
    expect(profile).toBe(null);
  });

  it('should find a profile by userId and return 1', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'count').mockResolvedValueOnce(Promise.resolve(1));
    const count = await repository.countProfileByUserId(profileModelMock.get('userId'));
    expect(count).toBe(1);
  });

  it('should not find a profile by userId and return 0', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'count').mockResolvedValueOnce(Promise.resolve(0));
    const count = await repository.countProfileByUserId(profileModelMock.get('userId'));
    expect(count).toBe(0);
  });

  it('should return a object with count and rows (array of profiles) properties', async () => {
    let max = chance.integer({ min: 1, max: 10 });
    let mockedProfiles = [];
    for (let i = 0; i < max; i++) {
      mockedProfiles.push(factory.createProfileModelMock(false));
    }
    let mockedReturn = {
      count: max,
      rows: mockedProfiles
    };
    jest.spyOn(Profile, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(mockedReturn));
    const filters = undefined;
    const itemsPerPage = chance.integer({ min: 1, max: 50 });
    const pageNumber = chance.integer({ min: 1, max: 10 });
    const name = undefined;
    const profiles = await repository.getAllProfiles(filters, itemsPerPage, pageNumber, name);
    expect(profiles).toBeDefined();
  });

  it('should update the object with given id and return [1]', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    const body = {
      [ProfileAttrs.birthDate]: profileModelMock.get('birthDate'),
      [ProfileAttrs.knowledge]: profileModelMock.get('knowledge'),
      [ProfileAttrs.scholarity]: profileModelMock.get('scholarity'),
      [ProfileAttrs.technologies]: profileModelMock.get('technologies'),
      [ProfileAttrs.languages]: profileModelMock.get('languages'),
      [ProfileAttrs.linkResume]: profileModelMock.get('linkResume'),
      [ProfileAttrs.searchable]: profileModelMock.get('searchable'),
      userId: profileModelMock.get('userId')
    };
    jest.spyOn(Profile, 'update').mockResolvedValueOnce(Promise.resolve([1]));
    const profile = await repository.updateProfile(body, profileModelMock.get('id'));
    expect(profile).toStrictEqual([1]);
  });

  it('should not find the object with given id and return [0]', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    const body = {
      [ProfileAttrs.birthDate]: profileModelMock.get('birthDate'),
      [ProfileAttrs.knowledge]: profileModelMock.get('knowledge'),
      [ProfileAttrs.scholarity]: profileModelMock.get('scholarity'),
      [ProfileAttrs.technologies]: profileModelMock.get('technologies'),
      [ProfileAttrs.languages]: profileModelMock.get('languages'),
      [ProfileAttrs.linkResume]: profileModelMock.get('linkResume'),
      [ProfileAttrs.searchable]: profileModelMock.get('searchable'),
      userId: profileModelMock.get('userId')
    };
    jest.spyOn(Profile, 'update').mockResolvedValueOnce(Promise.resolve([0]));
    const profile = await repository.updateProfile(body, profileModelMock.get('id'));
    expect(profile).toStrictEqual([0]);
  });

  it('it should create the object and return it', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    const body = {
      [ProfileAttrs.birthDate]: profileModelMock.get('birthDate'),
      [ProfileAttrs.knowledge]: profileModelMock.get('knowledge'),
      [ProfileAttrs.scholarity]: profileModelMock.get('scholarity'),
      [ProfileAttrs.technologies]: profileModelMock.get('technologies'),
      [ProfileAttrs.languages]: profileModelMock.get('languages'),
      [ProfileAttrs.linkResume]: profileModelMock.get('linkResume'),
      [ProfileAttrs.searchable]: profileModelMock.get('searchable'),
      userId: profileModelMock.get('userId')
    };
    jest.spyOn(Profile, 'create').mockResolvedValueOnce(Promise.resolve(profileModelMock));
    const profile = await repository.createProfile(body);
    expect(profile).toBeDefined();
  });

  it('it should fail to create the object and return null', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    const body = {
      [ProfileAttrs.birthDate]: profileModelMock.get('birthDate'),
      [ProfileAttrs.languages]: profileModelMock.get('languages'),
      [ProfileAttrs.linkResume]: profileModelMock.get('linkResume'),
      [ProfileAttrs.searchable]: profileModelMock.get('searchable'),
      userId: profileModelMock.get('userId')
    };
    jest.spyOn(Profile, 'create').mockResolvedValueOnce(Promise.resolve(null));
    const profile = await repository.createProfile(body);
    expect(profile).toBe(null);
  });

  it('should delete the object with given id and return [1]', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'destroy').mockResolvedValueOnce(Promise.resolve([1]));
    const profile = await repository.deleteProfile(profileModelMock.get('id'));
    expect(profile).toStrictEqual([1]);
  });

  it('should not find the object with given id and return [0]', async () => {
    const profileModelMock = factory.createProfileModelMock(true);
    jest.spyOn(Profile, 'destroy').mockResolvedValueOnce(Promise.resolve([0]));
    const profile = await repository.deleteProfile(profileModelMock.get('id'));
    expect(profile).toStrictEqual([0]);
  });
});
