import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';
import { UserAttrs } from '../models/UserAttrs.js';
import { JobAttrs } from '../models/JobAttrs.js';

const getAllJobs = async (filters, itemsPerPage, pageNumber) => {
  const jobs = await Job.findAndCountAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: [UserAttrs.name, UserAttrs.email]
      }
    ],
    where: filters,
    offset: (pageNumber - 1) * itemsPerPage || 0,
    limit: itemsPerPage || undefined
  });
  return jobs;
};

const getJobById = async (id) => {
  const job = await Job.findOne({
    where: {
      [JobAttrs.id]: id
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: [UserAttrs.name, UserAttrs.email]
      }
    ]
  });
  return job;
};

const getJobByUserId = async (id) => {
  const job = await Job.findAll({
    where: {
      userId: id
    }
  });
  return job;
};

const createJob = async (body) => {
  await Job.create(body);
};

const updateJob = async (body, id) => {
  await Job.update(body, {
    where: {
      [JobAttrs.id]: id
    }
  });
};

const deleteJob = async (id) => {
  await Job.destroy({
    where: {
      [JobAttrs.id]: id
    }
  });
};

export default { getAllJobs, getJobById, getJobByUserId, updateJob, deleteJob, createJob };
