import User from '../models/UserModel.js';
import { UserAttrs } from '../models/UserAttrs.js';

export const getAllUsers = async () => {
  const users = await User.findAndCountAll();
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      [UserAttrs.id]: id
    }
  });
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      [UserAttrs.email]: email
    }
  });
  return user;
};

export const checkExistentEmail = async (email) => {
  const count = await User.count({
    where: {
      [UserAttrs.email]: email
    }
  });
  return count;
};

export const createUser = async (body) => {
  const user = await User.create(body);
  return user;
};

export const updateUser = async (body, id) => {
  await User.update(body, {
    where: {
      [UserAttrs.id]: id
    }
  });
};

export const deleteUser = async (id) => {
  await User.destroy({
    where: {
      [UserAttrs.id]: id
    }
  });
};

export default { getAllUsers, getUserByEmail, getUserById, checkExistentEmail, deleteUser, updateUser, createUser };
