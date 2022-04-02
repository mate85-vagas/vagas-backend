import repository from '../repositories/JobRepository.js';
import { buildJobWhereClause } from '../utils/filters.js';

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
    const job = await repository.getJobById(req.params.id);
    if (job) res.json(job);
    else res.json({ message: 'Vaga não encontrada.' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Create new job
export const createJob = async (req, res) => {
  try {
    await repository.createJob(req.body, req.body.userId);
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
    await repository.updateJob(req.body, req.params.id);
    res.json({
      message: 'Vaga atualizada.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Delete job from db
export const deleteJob = async (req, res) => {
  try {
    await repository.deleteJob(req.params.id);
    res.json({
      message: 'Vaga deletada.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Apply user to a job
export const applyToJob = async (req, res) => {
  try {
    await repository.applyToJob(req.body.userId, req.body.jobId);
    res.json({ message: 'Aplicação realizada.' });
  } catch (error) {
    res.json({ message: error.message });
  }
};
