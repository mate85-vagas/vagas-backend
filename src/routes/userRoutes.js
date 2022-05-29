import express from 'express';

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  authenticate,
  getCreatedJobsByUser,
  getAppliedJobsByUser,
  inviteUser,
  passwordRecovery
} from '../controllers/Users.js';

const router = express.Router();

//Routes for User
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/:id/vagas/criadas', getCreatedJobsByUser);
router.get('/:id/vagas/aplicadas', getAppliedJobsByUser);
router.post('/', createUser);
router.post('/convite', inviteUser);
router.post('/login', authenticate);
router.post('/recuperacao/senha', passwordRecovery);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
