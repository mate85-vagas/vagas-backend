import Profile from '../models/ProfileModel.js';
import { ProfileAttrs } from '../models/ProfileAttrs.js';

const getProfileById = async (id) => {
  const profile = await Profile.findOne({
    where: {
      [ProfileAttrs.id]: id
    }
  });
  return profile;
};

const getAllProfiles = async () => {
  const profiles = await Profile.findAndCountAll();
  return profiles;
};

const updateProfile = async (body, id) => {
  await Profile.update(body, {
    where: {
      [ProfileAttrs.id]: id
    }
  });
};

const deleteProfile = async (id) => {
  await Profile.destroy({
    where: {
      [ProfileAttrs.id]: id
    }
  });
};

export default { updateProfile, getAllProfiles, getProfileById, deleteProfile };