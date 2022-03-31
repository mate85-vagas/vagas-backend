import express from 'express';

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  checkUser,
  getCreatedJobsByUser,
  getAppliedJobsByUser
} from '../controllers/Users.js';

const router = express.Router();

//Routes for User
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/:id/vagas_criadas', getCreatedJobsByUser);
router.get('/:id/vagas_aplicadas', getAppliedJobsByUser);
router.post('/', createUser);
router.post('/login', checkUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
