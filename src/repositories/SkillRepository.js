import Skill from '../models/SkillModel.js';
import { SkillAttrs } from '../models/SkillAttrs.js';

const getAllSkills = async () => {
  const skills = await Skill.findAndCountAll();
  return skills;
};

const getSkillById = async (id) => {
  const skill = await Skill.findOne({
    where: {
      [SkillAttrs.id]: id
    }
  });
  return skill;
};

const updateSkill = async (body, id) => {
  return await Skill.update(body, {
    where: {
      [SkillAttrs.id]: id
    }
  });
};

const deleteSkill = async (id) => {
  return await Skill.destroy({
    where: {
      [SkillAttrs.id]: id
    }
  });
};

const createBulkSkills = async (body) => {
  return await Skill.bulkCreate(body);
};

export default { getAllSkills, getSkillById, updateSkill, deleteSkill, createBulkSkills };
