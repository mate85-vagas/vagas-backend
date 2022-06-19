import repository from '../repositories/JobRepository.js';
import { buildJobWhereClause } from '../utils/filters.js';
import User_JobRepository from '../repositories/User_JobRepository.js';
import auth from '../utils/auth.js';
import ProfileRepository from '../repositories/ProfileRepository.js';
import { mail_sender } from '../utils/emailSender.js';
import UserRepository from '../repositories/UserRepository.js';
import { emailsListMail } from '../utils/emailSender.js';

//Get all jobs from db (can return filtered data by HTTP GET params)
export const getAllJobs = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const filters = buildJobWhereClause(req);
    const jobs = await repository.getAllJobs(filters, itemsPerPage, pageNumber);
    res.json(jobs);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Get a job by given id
export const getJobById = async (req, res) => {
  try {
    const jobInfo = await User_JobRepository.getInformationByJobId(req.params.id);
    if (jobInfo) res.json(jobInfo);
    else res.json({ message: 'Vaga não encontrada.', error: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Create new job
export const createJob = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    const job = await repository.createJob(req.body, userId);
    if (job) {
      emailsListMail(job, req.body.emailsToSend);
      res.json({
        message: 'Vaga criada.'
      });
    } else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};

//Update job record on db
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { isAdmin, userId } = auth.getTokenProperties(req.headers['x-access-token']);

    if ((await User_JobRepository.countUser_JobByJobIdAndUserId(jobId, userId)) || isAdmin) {
      await repository.updateJob(req.body, jobId);
      return res.json({
        message: 'Vaga atualizada.'
      });
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};

//Delete job from db
export const deleteJob = async (req, res) => {
  try {
    const { userId, isAdmin } = auth.getTokenProperties(req.headers['x-access-token']);
    const jobId = req.params.id;

    if ((await User_JobRepository.countUser_JobByJobIdAndUserId(jobId, userId)) || isAdmin) {
      await repository.deleteJob(jobId);
      return res.status(204).json();
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};

//Apply user to a job and send an email for the job creator
export const applyToJob = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    let count = await ProfileRepository.countProfileByUserId(userId);
    if (!count) res.json({ message: 'Necessário criar perfil.', error: true, emptyProfile: true });
    if (!(await repository.countValidJob(req.body.jobId))) throw new Error('Vaga expirada');
    const userJob = await repository.applyToJob(userId, req.body.jobId);
    if (userJob) {
      const userApplier = await UserRepository.getUserById(userId);
      const infoUserRecvAndJob = await User_JobRepository.getInformationByJobId(req.body.jobId);
      const userReceiver = infoUserRecvAndJob.user.dataValues;
      const profileUserApplier = await ProfileRepository.getProfileByUserId(userId);
      const jobToApply = infoUserRecvAndJob.job.dataValues;
      await mail_sender(userApplier, userReceiver, profileUserApplier, jobToApply);
      res.json({ message: 'Aplicação realizada.' });
    } else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};
