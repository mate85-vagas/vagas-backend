import repository from '../repositories/JobRepository.js';
import { buildJobWhereClause } from '../utils/filters.js';
import User_JobRepository from '../repositories/User_JobRepository.js';
import auth from '../utils/auth.js';
import ProfileRepository from '../repositories/ProfileRepository.js';
import { mail_sender } from '../utils/emailSender.js'
import UserRepository from '../repositories/UserRepository.js';

//Get all jobs from db (can return filtered data by HTTP GET params)
export const getAllJobs = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const filters = buildJobWhereClause(req);
    const jobs = await repository.getAllJobs(filters, itemsPerPage, pageNumber);
    res.json(jobs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Get a job by given id
export const getJobById = async (req, res) => {
  try {
    const jobInfo = await User_JobRepository.getInformationByJobId(req.params.id);
    if (jobInfo) res.json(jobInfo);
    else res.json({ message: 'Vaga não encontrada.' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Create new job
export const createJob = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    await repository.createJob(req.body, userId);
    res.json({
      message: 'Vaga criada.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Update job record on db
export const updateJob = async (req, res) => {
  try {
    const userId = req.body.userId;
    const jobId = req.params.id;
    if (userId && (await User_JobRepository.countUser_JobByJobIdAndUserId(jobId, userId))) {
      auth.checkToken(userId, req.headers['x-access-token']);
      await repository.updateJob(req.body, jobId);
      res.json({
        message: 'Vaga atualizada.'
      });
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Delete job from db
export const deleteJob = async (req, res) => {
  try {
    const userId = auth.checkTokenAndReturnId(req.headers['x-access-token']);
    const jobId = req.params.id;
    if (await User_JobRepository.countUser_JobByJobIdAndUserId(jobId, userId)) {
      await repository.deleteJob(jobId);
      res.json({
        message: 'Vaga deletada.'
      });
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Apply user to a job and send an email for the job creator
export const applyToJob = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    let count = await ProfileRepository.countProfileByUserId(userId);
    if (!count) throw new Error('Necessário criar perfil.');
    await repository.applyToJob(userId, req.body.jobId);
    const userApplier = await UserRepository.getUserById(userId)
    const infoUserRecvAndJob = await User_JobRepository.getInformationByJobId(
      req.body.jobId
    )
    const userReceiver = infoUserRecvAndJob.user.dataValues
    const profileUserApplier = await ProfileRepository.getProfileByUserId(userId)
    const jobToApply = infoUserRecvAndJob.job.dataValues
    await mail_sender(userApplier, userReceiver, profileUserApplier, jobToApply)
      res.json({ message: 'Aplicação realizada.' });
  } catch (error) {
    res.json({ message: error.message });
  }
};
