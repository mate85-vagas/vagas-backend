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

const countProfileByUserId = async (userId) => {
  const count = await Profile.count({
    where: {
      userId: userId
    }
  });
  return count;
};

const getProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({
    where: {
      userId: userId
    }
  });
  return profile;
};

const getAllProfiles = async () => {
  const profiles = await Profile.findAndCountAll({
    where: { [ProfileAttrs.searchable]: true }
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
  countProfileByUserId,
  getProfileByUserId
};
