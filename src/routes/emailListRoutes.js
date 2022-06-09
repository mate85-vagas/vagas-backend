import express from 'express';

import {
  getAllEmailLists,
  getEmailListById,
  updateEmailList,
  deleteBulkEmailLists,
  updateAllIsActive,
  createBulkEmailLists,
  getEmailListState
} from '../controllers/EmailLists.js';

const router = express.Router();

//Routes for Skill
router.get('/verificacao', getEmailListState);
router.get('/', getAllEmailLists);
router.get('/:id', getEmailListById);
router.post('/', createBulkEmailLists);
router.patch('/:id', updateEmailList);
router.patch('/', updateAllIsActive);
router.delete('/:ids', deleteBulkEmailLists);

export default router;
