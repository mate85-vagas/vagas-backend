import User from '../models/UserModel.js';
import { UserAttrs } from '../models/UserAttrs.js';

const getAllUsers = async () => {
  const users = await User.findAndCountAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      [UserAttrs.id]: id
    }
  });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      [UserAttrs.email]: email
    }
  });
  return user;
};

const checkExistentEmail = async (email) => {
  const count = await User.count({
    where: {
      [UserAttrs.email]: email
    }
  });
  return count;
};

const createUser = async (body) => {
  const user = await User.create(body);
  return user;
};

const updateUser = async (body, id) => {
  await User.update(body, {
    where: {
      [UserAttrs.id]: id
    }
  });
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      [UserAttrs.id]: id
    }
  });
};

export default { getAllUsers, getUserByEmail, getUserById, checkExistentEmail, deleteUser, updateUser, createUser };
