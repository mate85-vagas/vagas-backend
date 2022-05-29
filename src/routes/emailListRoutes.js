import express from 'express';

import { getAllEmailLists, getEmailListById, updateEmailList, deleteEmailList, updateAllIsActive } from '../controllers/EmailLists.js';

const router = express.Router();

//Routes for Skill
router.get('/', getAllEmailLists);
router.get('/:id', getEmailListById);
router.patch('/:id', updateEmailList);
router.patch('/update-all', updateAllIsActive);
router.delete('/:id', deleteEmailList);

export default router;
