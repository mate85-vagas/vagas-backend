/* eslint-disable no-undef */
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserAttrs } from '../models/UserAttrs.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAndCountAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        [UserAttrs.id]: req.params.id
      }
    });
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await User.create(req.body);
    res.json({
      message: 'Usuário criado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const checkUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        [UserAttrs.email]: req.body.email
      }
    });
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        const id = user.id;
        dotenv.config();

        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 7200 // expires in 2h
        });
        res.json({ token: token });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await User.update(req.body, {
      where: {
        [UserAttrs.id]: req.params.id
      }
    });
    res.json({
      message: 'Usuário atualizado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        [UserAttrs.id]: req.params.id
      }
    });
    res.json({
      message: 'Usuário deletado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
