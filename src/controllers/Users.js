import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import repository from '../repositories/UserRepository.js';
import User_JobRepository from '../repositories/User_JobRepository.js';
import auth from '../utils/auth.js';

//Check if e-mail is valid
const checkValidEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(email)) throw new Error('E-mail inválido ou existente.');
};

//Check if e-mail exists in db
const checkExistentEmail = async (email) => {
  try {
    const count = await repository.checkExistentEmail(email);
    if (count) throw new Error();
  } catch (error) {
    error.message = 'E-mail inválido ou existente.';
    throw error;
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await repository.getAllUsers();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-acess-token']);
    const user = await repository.getUserById(req.params.id);
    if (user) res.json(user);
    else res.json({ message: 'Usuário não encontrado.' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Get all jobs that user created
export const getCreatedJobsByUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-acess-token']);
    const user_jobs = await User_JobRepository.getJobsByUserId(req.params.id, true);
    res.json(user_jobs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Get all jobs that user applied to
export const getAppliedJobsByUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-acess-token']);
    const user_jobs = await User_JobRepository.getJobsByUserId(req.params.id, false);
    res.json(user_jobs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    checkValidEmail(req.body.email);
    await checkExistentEmail(req.body.email);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await repository.createUser(req.body);
    const token = auth.createToken(user.id);
    res.json({
      id: user.id,
      token: token
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Check user credentials
export const checkUser = async (req, res) => {
  try {
    const user = await repository.getUserByEmail(req.body.email);
    if (user) {
      //Compare password from req body to stored password by bcrypt compare
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        dotenv.config();
        const token = auth.createToken(user.id);
        res.json({
          id: user.id,
          token: token
        });
      } else {
        res.status(401).json({ message: 'Acesso negado.' });
      }
    } else {
      res.status(401).json({ message: 'Acesso negado.' });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-acess-token']);
    checkValidEmail(req.body.email);
    await checkExistentEmail(req.body.email);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await repository.updateUser(req.body, req.params.id);
    res.json({
      message: 'Usuário atualizado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-acess-token']);
    await repository.deleteUser(req.params.id);
    res.json({
      message: 'Usuário deletado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
