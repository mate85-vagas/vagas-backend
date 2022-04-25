import User_Job from '../../../models/User_JobModel';
import Job from '../../../models/JobModel';
import User from '../../../models/UserModel.js';
import Chance from 'chance';

const chance = new Chance();

const createUser_JobModelMock = (type) => {
  const userJobModelMock = new User_Job();
  userJobModelMock.set('jobId', chance.integer({ min: 1 }));
  if (type == 1) {
    userJobModelMock.set('userId', chance.integer({ min: 1 }));
    userJobModelMock.set('createdByUser', true);
  } else if (type == 2 || type == 3) {
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
    if (type == 3) {
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

export default { createUser_JobModelMock };
