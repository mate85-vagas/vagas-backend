import Job from '../models/JobModel.js';
import User_JobRepository from '../repositories/User_JobRepository.js';
import { JobAttrs } from '../models/JobAttrs.js';
import { Sequelize } from 'sequelize';
const { Op } = Sequelize;

const getAllJobs = async (filters, itemsPerPage, pageNumber) => {
  const jobs = await Job.findAndCountAll({
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
    }
  });
  return job;
};

const createJob = async (body, userId) => {
  const job = await Job.create(body);
  await User_JobRepository.createUser_Job(userId, job.id, true);
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

const applyToJob = async (userId, jobId) => {
  await User_JobRepository.createUser_Job(userId, jobId, false);
};

const deleteExpiredJobs = async () => {
  await Job.destroy({
    where: {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('DATE_ADD', Sequelize.col('createdAt'), Sequelize.literal('INTERVAL 6 MONTH')), {
          [Op.lt]: (() => {
            let date = new Date();
            date.setHours(date.getHours() - 3);
            return date;
          })()
        })
      ]
    }
  });
};

const countValidJob = async (jobId) => {
  const count = await Job.count({
    where: {
      [JobAttrs.endingDate]: {
        [Op.gte]: (() => {
          let date = new Date();
          date.setHours(date.getHours() - 3);
          return date;
        })()
      },
      [JobAttrs.id]: jobId
    }
  });
  return count;
};

export default {
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  createJob,
  applyToJob,
  deleteExpiredJobs,
  countValidJob
};
