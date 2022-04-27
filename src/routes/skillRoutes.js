import express from 'express';

import { getAllSkills, getSkillById, updateSkill, deleteSkill, createBulkSkills } from '../controllers/Skills.js';

const router = express.Router();

//Routes for Skill
router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/', createBulkSkills);
router.patch('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
