import express from 'express';

import { getAllSkills, createSkill, getSkillById, updateSkill, deleteSkill  } from '../controllers/Skills.js';

const router = express.Router();

//Routes for Skill
router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/', createSkill);
router.patch('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
