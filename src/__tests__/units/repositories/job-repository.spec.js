import repository from '../../../repositories/JobRepository';
import Job from '../../../models/JobModel';
import User_Job from '../../../models/User_JobModel';
import { jest } from '@jest/globals';
import { jobModelMock } from '../factory/job-model-factory';

describe('Jobs Context', () => {
  it('getJobById: should find a job by id', async () => {
    jest.spyOn(Job, 'findOne').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    const job = await repository.getJobById(jobModelMock.get('id'));
    expect(job).toBeDefined();
  });

  it('getJobById: should return empty job object', async () => {
    jest.spyOn(Job, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const job = await repository.getJobById(jobModelMock.get('id'));
    expect(job).toBeNull();
  });

  it('createJob: should return undefined', async () => {
    jest.spyOn(Job, 'create').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    jest.spyOn(User_Job, 'create').mockResolvedValueOnce(Promise.resolve(null));
    const job = await repository.createJob('', jobModelMock.get('id'));
    expect(job).toBeUndefined();
  });

  it('updateJob: should return undefined', async () => {
    jest.spyOn(Job, 'update').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    const job = await repository.updateJob('', jobModelMock.get('id'));
    expect(job).toBeUndefined();
  });

  it('deleteJob: should return undefined', async () => {
    jest.spyOn(Job, 'destroy').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    const job = await repository.deleteJob(jobModelMock.get('id'));
    expect(job).toBeUndefined();
  });

  it('applyToJob: should return undefined', async () => {
    jest.spyOn(User_Job, 'create').mockResolvedValueOnce(Promise.resolve(null));
    const job = await repository.applyToJob(-1, jobModelMock.get('id'));
    expect(job).toBeUndefined();
  });

  it('getAllJobs: should find all (one) jobs', async () => {
    jest.spyOn(Job, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    const job = await repository.getAllJobs(jobModelMock.get('id'));
    expect(job).toBeDefined();
  });

  it('getAllJobs: should return empty job object', async () => {
    jest.spyOn(Job, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(null));
    const job = await repository.getAllJobs(jobModelMock.get('id'));
    expect(job).toBeNull();
  });

});
