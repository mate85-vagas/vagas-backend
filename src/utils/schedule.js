import cron from 'node-cron';
import JobRepository from '../repositories/JobRepository.js';

export const deleteExpiredJobs = () => {
  const scheduledJob = cron.schedule(
    '1 0 * * *',
    () => {
      JobRepository.deleteExpiredJobs();
    },
    { timezone: 'America/Bahia' }
  );

  scheduledJob.start();
};
