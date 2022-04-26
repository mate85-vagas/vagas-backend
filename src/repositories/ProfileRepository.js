import Profile from '../models/ProfileModel.js';
import { ProfileAttrs } from '../models/ProfileAttrs.js';
import User from '../models/UserModel.js';
import { UserAttrs } from '../models/UserAttrs.js';

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

const getAllProfiles = async (filters, itemsPerPage, pageNumber, name) => {
  const profiles = await Profile.findAndCountAll({
    where: filters,
    offset: (pageNumber - 1) * itemsPerPage || 0,
    limit: itemsPerPage || undefined,
    include: {
      model: User,
      where: name,
      as: 'user',
      attributes: { exclude: [UserAttrs.id, 'createdAt', 'updatedAt', UserAttrs.password] }
    }
  });
  return profiles;
};

const updateProfile = async (body, id) => {
  return await Profile.update(body, {
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
  return await Profile.destroy({
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
  getProfileByUserId,
  countProfileByUserId
};
