import User_Job from '../../../models/User_JobModel';
import Chance from 'chance';

const chance = new Chance();
const userJobModelMock = new User_Job();

userJobModelMock.set('userId', chance.integer({ min: 1 }));
userJobModelMock.set('jobId', chance.integer({ min: 1 }));
userJobModelMock.set('createdByUser', true);

export { userJobModelMock };
