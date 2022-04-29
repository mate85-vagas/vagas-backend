import express from 'express';
import {
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
  createBulkTechnologies
} from '../controllers/Technologies.js';

const router = express.Router();

//Routes for Technologies
router.get('/', getAllTechnologies);
router.get('/:id', getTechnologyById);
router.post('/', createBulkTechnologies);
router.patch('/:id', updateTechnology);
router.delete('/:id', deleteTechnology);

export default router;
