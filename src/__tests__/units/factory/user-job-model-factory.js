import User_Job from '../../../models/User_JobModel';
import Job from '../../../models/JobModel';
import User from '../../../models/UserModel.js';
import Chance from 'chance';

const chance = new Chance();

const USER_JOB = 1;
const USER_JOB_INCLUDE_JOB = 2;
const USER_JOB_INCLUDE_JOB_AND_USER = 3;

const createUser_JobModelMock = (type) => {
  const userJobModelMock = new User_Job();
  userJobModelMock.set('jobId', chance.integer({ min: 1 }));
  if (type == USER_JOB) {
    userJobModelMock.set('userId', chance.integer({ min: 1 }));
    userJobModelMock.set('createdByUser', chance.bool());
  } else if (type == USER_JOB_INCLUDE_JOB || type == USER_JOB_INCLUDE_JOB_AND_USER) {
    const jobModelMock = new Job();

    jobModelMock.set('description', chance.string());
    jobModelMock.set('title', chance.string());
    jobModelMock.set('site', chance.string());
    jobModelMock.set('type', chance.string());
    jobModelMock.set('workload', chance.floating({ min: 1 }));
    jobModelMock.set('salary', chance.floating({ min: 1 }));
    jobModelMock.set('endingDate', chance.date());
    jobModelMock.set('startingDate', chance.date());
    jobModelMock.set('scholarity', chance.string());
    jobModelMock.set('createdAt', chance.date());
    jobModelMock.set('updatedAt', chance.date());

    userJobModelMock.dataValues.job = jobModelMock;
    userJobModelMock._previousDataValues.job = undefined;
    if (type == USER_JOB_INCLUDE_JOB_AND_USER) {
      userJobModelMock.set('userId', chance.integer({ min: 1 }));
      const userModelMock = new User();
      userModelMock.set('name', chance.string({ max: 255 }));
      userModelMock.set('email', chance.email());
      userJobModelMock.dataValues.user = userModelMock;
      userJobModelMock._previousDataValues.user = undefined;
    }
  }

  return userJobModelMock;
};

export default { createUser_JobModelMock, USER_JOB, USER_JOB_INCLUDE_JOB, USER_JOB_INCLUDE_JOB_AND_USER };

