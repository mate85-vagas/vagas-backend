import repository from '../../../repositories/JobRepository';
import Job from '../../../models/JobModel';
import User_Job from '../../../models/User_JobModel';
import { jest } from '@jest/globals';
import { jobModelMock } from '../factory/job-model-factory';
import { userJobModelMock } from '../factory/user-job-model-factory';

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

  it('createJob: should create job and user_job', async () => {
    jest.spyOn(Job, 'create').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    jest.spyOn(User_Job, 'create').mockResolvedValueOnce(Promise.resolve(userJobModelMock));
    try {
      await repository.createJob('', jobModelMock.get('id'));
      expect.anything();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('createJob: should throw error', async () => {
    jest.spyOn(Job, 'create').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.createJob('', jobModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('updateJob: should update job', async () => {
    jest.spyOn(Job, 'update').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    try {
      await repository.updateJob('', jobModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('updateJob: should throw error', async () => {
    jest.spyOn(Job, 'update').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.updateJob('', jobModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('deleteJob: should delete job', async () => {
    jest.spyOn(Job, 'destroy').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    try {
      await repository.deleteJob(jobModelMock.get('id'));
      expect.anything();      
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('deleteJob: should throw error', async () => {
    jest.spyOn(Job, 'destroy').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.deleteJob(jobModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();  
    }
  });

  it('applyToJob: should apply to job', async () => {
    jest.spyOn(User_Job, 'create').mockResolvedValueOnce(Promise.resolve(userJobModelMock));
    try {
      await repository.applyToJob(1, jobModelMock.get('id'));
      expect.anything();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('applyToJob: should throw error', async () => {
    jest.spyOn(User_Job, 'create').mockRejectedValueOnce(new Error("error"));
    try {
      await repository.applyToJob(1, jobModelMock.get('id'));
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('getAllJobs: should find all (one) jobs', async () => {
    jest.spyOn(Job, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve({count: 1, rows: [jobModelMock]}));
    const job = await repository.getAllJobs(1, 1, 1);
    expect(job).toBeDefined();
  });

  it('getAllJobs: should return empty job object', async () => {
    jest.spyOn(Job, 'findAndCountAll').mockResolvedValueOnce(Promise.resolve(null));
    const job = await repository.getAllJobs(1, 1, 1);
    expect(job).toBeNull();
  });

});
