import repository from '../../../repositories/ProfileRepository';
import Profile from '../../../models/ProfileModel';
import { jest } from '@jest/globals';
import { profileModelMock } from '../factory/profile-model-factory';

describe('Profile Context', () => {
  it('should find a profile by id', async () => {
    jest.spyOn(Profile, 'findOne').mockResolvedValueOnce(Promise.resolve(profileModelMock));
    const profile = await repository.getProfileById(profileModelMock.get('id'));
    expect(profile).toBeDefined();
  });

  it('should return empty profile object', async () => {
    jest.spyOn(Profile, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const profile = await repository.getProfileById(profileModelMock.get('id'));
    expect(profile).toBe(null);
  });
});
