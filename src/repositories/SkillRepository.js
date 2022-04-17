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

const createSkill = async (body) => {
  await Skill.create(body);
};

const updateSkill = async (body, id) => {
  await Skill.update(body, {
    where: {
      [SkillAttrs.id]: id
    }
  });
};

const deleteSkill = async (id) => {
  await Skill.destroy({
    where: {
      [SkillAttrs.id]: id
    }
  });
};

export default { getAllSkills, getSkillById, updateSkill, deleteSkill, createSkill };
