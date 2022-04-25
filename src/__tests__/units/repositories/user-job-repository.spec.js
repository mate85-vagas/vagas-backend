import repository from '../../../repositories/User_JobRepository.js';
import User_Job from '../../../models/User_JobModel.js';
import { jest } from '@jest/globals';
import factory from '../factory/user-job-model-factory.js';
import Chance from 'chance';

const chance = new Chance();

describe('User Job Context', () => {
  it('should create a user_job object and return it', async () => {
    const user_jobModelMock = factory.createUser_JobModelMock(factory.USER_JOB);
    jest.spyOn(User_Job, 'create').mockResolvedValueOnce(Promise.resolve(user_jobModelMock));
    const user_job = await repository.createUser_Job(
      user_jobModelMock.get('userId'),
      user_jobModelMock.get('jobId'),
      user_jobModelMock.get('createdByUser')
    );
    expect(user_job).toBeDefined();
  });

  it('should not create a user_job object and should return null', async () => {
    const user_jobModelMock = factory.createUser_JobModelMock(factory.USER_JOB);
    jest.spyOn(User_Job, 'create').mockResolvedValueOnce(Promise.resolve(null));
    const user_job = await repository.createUser_Job(
      user_jobModelMock.get('userId'),
      user_jobModelMock.get('createdByUser')
    );
    expect(user_job).toBe(null);
  });

  it('should return a object with count and rows (array of user_jobs with job object included) properties', async () => {
    let max = chance.integer({ min: 1, max: 10 });
    let mockedUser_Jobs = [];
    for (let i = 0; i < max; i++) {
      mockedUser_Jobs.push(factory.createUser_JobModelMock(factory.USER_JOB_INCLUDE_JOB));
    }
    let mockedReturn = {
      count: max,
      rows: mockedUser_Jobs
    };
    jest.spyOn(User_Job, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(mockedReturn));
    const userId = chance.integer({ min: 1 });
    const created = chance.bool();
    const user_jobs = await repository.getJobsByUserId(userId, created);
    expect(user_jobs).toBeDefined();
  });

  it('should find a job by given Job id', async () => {
    const user_jobModelMock = factory.createUser_JobModelMock(factory.USER_JOB_INCLUDE_JOB_AND_USER);
    jest.spyOn(User_Job, 'findOne').mockResolvedValueOnce(Promise.resolve(user_jobModelMock));
    const user_job = await repository.getInformationByJobId(user_jobModelMock.get('jobId'));
    expect(user_job).toBeDefined();
  });

  it('should not find a job by given Job id', async () => {
    const user_jobModelMock = factory.createUser_JobModelMock(factory.USER_JOB_INCLUDE_JOB_AND_USER);
    jest.spyOn(User_Job, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const user_job = await repository.getInformationByJobId(user_jobModelMock.get('jobId'));
    expect(user_job).toBe(null);
  });

  it('should find a user_job by userId and jobId, should return 1', async () => {
    const user_jobModelMock = factory.createUser_JobModelMock(factory.USER_JOB);
    jest.spyOn(User_Job, 'count').mockResolvedValueOnce(Promise.resolve(1));
    const count = await repository.countUser_JobByJobIdAndUserId(
      user_jobModelMock.get('jobId'),
      user_jobModelMock.get('userId')
    );
    expect(count).toBe(1);
  });

  it('should not find a user_job by userId and jobId, should return 0', async () => {
    const user_jobModelMock = factory.createUser_JobModelMock(factory.USER_JOB);
    jest.spyOn(User_Job, 'count').mockResolvedValueOnce(Promise.resolve(0));
    const count = await repository.countUser_JobByJobIdAndUserId(
      user_jobModelMock.get('jobId'),
      user_jobModelMock.get('userId')
    );
    expect(count).toBe(0);
  });
});
