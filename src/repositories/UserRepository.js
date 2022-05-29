import User from '../models/UserModel.js';
import User_Job from '../models/User_JobModel.js';
import { UserAttrs } from '../models/UserAttrs.js';
import Job from '../models/JobModel.js';

const getAllUsers = async () => {
  const users = await User.findAndCountAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
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
  const queryResult = await User.update(body, {
    where: {
      [UserAttrs.id]: id
    }
  });
  if (queryResult === 0) throw new Error('falha na operação.');
  return queryResult;
};

const deleteUser = async (id) => {
  const userCreatedJobs = await User_Job.findAll({
    attributes: ['jobId'],
    where: {
      userId: id,
      createdByUser: true
    }
  });

  userCreatedJobs.forEach(async (jobId) => {
    await Job.destroy({
      where: {
        id: jobId.get('jobId')
      }
    });
  });

  const queryResult = await User.destroy({
    where: {
      id: id
    }
  });
  if (queryResult === 0) throw new Error('falha na operação.');
  return queryResult;
};

export default { getAllUsers, getUserByEmail, getUserById, checkExistentEmail, deleteUser, updateUser, createUser };
