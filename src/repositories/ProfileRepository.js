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

const getProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({
    where: {
      userId: userId
    }
  });
  return profile;
};

const getAllProfiles = async (filters, itemsPerPage, pageNumber) => {
  const profiles = await Profile.findAndCountAll({
    where:
    filters,
    offset: (pageNumber - 1) * itemsPerPage || 0,
    limit: itemsPerPage || undefined,
  });
  return profiles;
};

const updateProfile = async (body, id) => {
  await Profile.update(body, {
    where: {
      [ProfileAttrs.id]: id
    }
  });
};

const createProfile = async (body) => {
  const profile = await Profile.create(body);
  return profile;
};

const deleteProfile = async (id) => {
  await Profile.destroy({
    where: {
      [ProfileAttrs.id]: id
    }
  });
};

export default {
  updateProfile,
  getAllProfiles,
  getProfileById,
  createProfile,
  deleteProfile,
  getProfileByUserId
};
