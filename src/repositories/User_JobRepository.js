import User_Job from '../models/User_JobModel.js';
import { User_JobAttrs } from '../models/User_JobAttrs.js';
import Job from '../models/JobModel.js';
import { JobAttrs } from '../models/JobAttrs.js';
import User from '../models/UserModel.js';
import { UserAttrs } from '../models/UserAttrs.js';

const createUser_Job = async (userId, jobId, created) => {
  const users = await User_Job.create({
    [User_JobAttrs.userId]: userId,
    [User_JobAttrs.jobId]: jobId,
    [User_JobAttrs.created]: created
  });
  return users;
};

const getJobsByUserId = async (userId, created) => {
  const createdJobsByUser = await User_Job.findAndCountAll({
    where: {
      [User_JobAttrs.userId]: userId,
      [User_JobAttrs.created]: created
    },
    attributes: {
      exclude: [User_JobAttrs.userId, User_JobAttrs.created]
    },
    include: [
      {
        model: Job,
        as: 'job',
        attributes: { exclude: [JobAttrs.id] }
      }
    ]
  });
  return createdJobsByUser;
};

const getInformationByJobId = async (jobId) => {
  const createdJobsByUser = await User_Job.findOne({
    where: {
      [User_JobAttrs.jobId]: jobId,
      [User_JobAttrs.created]: true
    },
    attributes: {
      exclude: [User_JobAttrs.created]
    },
    include: [
      {
        model: Job,
        as: 'job',
        attributes: { exclude: [JobAttrs.id] }
      },
      {
        model: User,
        as: 'user',
        attributes: { exclude: [UserAttrs.id, 'createdAt', 'updatedAt', UserAttrs.password] }
      }
    ]
  });
  return createdJobsByUser;
};

export default { createUser_Job, getJobsByUserId, getInformationByJobId };
