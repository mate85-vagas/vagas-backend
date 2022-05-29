import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import repository from '../repositories/UserRepository.js';
import User_JobRepository from '../repositories/User_JobRepository.js';
import auth from '../utils/auth.js';
import ProfileRepository from '../repositories/ProfileRepository.js';
import { inviteMail, recoveryMail } from '../utils/emailSender.js';
import TokenRepository from '../repositories/TokenRepository.js';
import crypto from 'crypto';
import { UserAttrs } from '../models/UserAttrs.js';

dotenv.config();

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
    res.json({ message: error.message, error: true });
  }
};

export const getUserById = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-access-token']);
    const user = await repository.getUserById(req.params.id);
    if (user) {
      const profile = await ProfileRepository.getProfileByUserId(user.id);
      let profileId = -1;
      if (profile) profileId = profile.id;
      user.dataValues.profileId = profileId;
      res.json(user);
    } else res.json({ message: 'Usuário não encontrado.', error: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Get all jobs that user created
export const getCreatedJobsByUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-access-token']);
    const pageNumber = parseInt(req.query.pageNumber);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const user_jobs = await User_JobRepository.getJobsByUserId(req.params.id, true, itemsPerPage, pageNumber);
    res.json(user_jobs);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Get all jobs that user applied to
export const getAppliedJobsByUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-access-token']);
    const pageNumber = parseInt(req.query.pageNumber);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const user_jobs = await User_JobRepository.getJobsByUserId(req.params.id, false, itemsPerPage, pageNumber);
    res.json(user_jobs);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const createUser = async (req, res) => {
  try {
    checkValidEmail(req.body.email);
    await checkExistentEmail(req.body.email);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    if (!(req.body.isAdmin == true && req.body.secret == process.env.SECRET_ADM)) {
      req.body.isAdmin = false;
      req.body.isAuthorized = false;
    } else req.body.isAuthorized = true;
    const user = await repository.createUser(req.body);
    const token = auth.createToken(user.id);
    res.json({
      id: user.id,
      token: token
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
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
        res.status(401).json({ message: 'Acesso negado.', error: true });
      }
    } else {
      res.status(401).json({ message: 'Acesso negado.', error: true });
    }
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-access-token']);
    if (req.body.email) {
      checkValidEmail(req.body.email);
      await checkExistentEmail(req.body.email);
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const result = await repository.updateUser(req.body, req.params.id);
    if (result[0] == 1)
      res.json({
        message: 'Usuário atualizado.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteUser = async (req, res) => {
  try {
    auth.checkToken(req.params.id, req.headers['x-access-token']);
    await repository.deleteUser(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const inviteUser = async (req, res) => {
  try {
    auth.checkTokenAndReturnId(req.headers['x-access-token']);
    inviteMail(req.body.email);
    res.json({ message: 'Convite enviado.' });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Delete expired tokens, create new password recovery tokens and recovers password
export const passwordRecovery = async (req, res) => {
  try {
    const email = req.body.email;
    const token = req.body.token;
    let password = req.body.password;
    if (email) {
      await TokenRepository.deleteExpiredTokens();
      const user = await repository.getUserByEmail(email);
      if (user) {
        let random_token = crypto.randomBytes(20).toString('hex');
        //Try to create a unique token, if not possible try again
        try {
          await TokenRepository.createToken(user.dataValues.id, random_token);
        } catch {
          random_token = crypto.randomBytes(20).toString('hex');
          await TokenRepository.createToken(user.dataValues.id, random_token);
        }
        recoveryMail(email, random_token);
      }
      res.sendStatus(200);
    } else if (token && password) {
      const received_token = await TokenRepository.checkToken(token);
      if (received_token) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        await repository.updateUser({ [UserAttrs.password]: password }, received_token.dataValues.userId);
        await TokenRepository.deleteToken(received_token.dataValues.token);

        res.sendStatus(200);
      } else throw new Error('invalid token');
    } else res.sendStatus(400);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
