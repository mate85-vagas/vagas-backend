import express from 'express';
import {
  getAllTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  createBulkTechnologies
} from '../controllers/Technologies.js';

const router = express.Router();

//Routes for Technologies
router.get('/', getAllTechnologies);
router.get('/:id', getTechnologyById);
router.post('/', createTechnology);
router.post('/multiplas', createBulkTechnologies);
router.patch('/:id', updateTechnology);
router.delete('/:id', deleteTechnology);

export default router;
