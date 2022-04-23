import express from 'express';

import {
  getAllSkills,
  createSkill,
  getSkillById,
  updateSkill,
  deleteSkill,
  createBulkSkills
} from '../controllers/Skills.js';

const router = express.Router();

//Routes for Skill
router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/', createSkill);
router.post('/multiplas', createBulkSkills);
router.patch('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
