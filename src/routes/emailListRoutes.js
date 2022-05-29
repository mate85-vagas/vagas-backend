import express from 'express';

import { getAllEmailLists, getEmailListById, updateEmailList, deleteEmailList, updateAllIsActive, createEmailList } from '../controllers/EmailLists.js';

const router = express.Router();

//Routes for Skill
router.get('/', getAllEmailLists);
router.get('/:id', getEmailListById);
router.post('/', createEmailList);
router.patch('/:id', updateEmailList);
router.patch('/', updateAllIsActive);
router.delete('/:id', deleteEmailList);

export default router;
