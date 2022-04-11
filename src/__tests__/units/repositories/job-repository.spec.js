import repository from '../../../repositories/JobRepository';
import Job from '../../../models/JobModel';
import { jest } from '@jest/globals';
import { jobModelMock } from '../factory/job-model-factory';

describe('Jobs Context', () => {
  it('should find a job by id', async () => {
    jest.spyOn(Job, 'findOne').mockResolvedValueOnce(Promise.resolve(jobModelMock));
    const job = await repository.getJobById(jobModelMock.get('id'));
    expect(job).toBeDefined();
  });

  it('should return empty job object', async () => {
    jest.spyOn(Job, 'findOne').mockResolvedValueOnce(Promise.resolve(null));
    const job = await repository.getJobById(jobModelMock.get('id'));
    expect(job).toBe(null);
  });
});
