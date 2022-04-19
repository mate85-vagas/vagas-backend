import repository from '../repositories/SkillRepository.js';

//Get all the skills in db
export const getAllSkills = async (req, res) => {
  try {
    const skills = await repository.getAllSkills();
    res.json(skills);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Get skill by id in db
export const getSkillById = async (req, res) => {
  try {
    const skillInfo = await repository.getSkillById(req.params.id);
    if (skillInfo) res.json(skillInfo);
    else res.json({ message: 'Habilidade não encontrada.' });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Create a skill
export const createSkill = async (req, res) => {
  try {
    await repository.createSkill(req.body);
    res.json({
      message: 'Habilidade criada.'
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Update a skill on db
export const updateSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    await repository.updateSkill(req.body, skillId);
    res.json({
      message: 'Habilidade atualizada.'
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Delete a skill on db
export const deleteSkill = async (req, res) => {
  try {
    await repository.deleteSkill(req.params.id);
    res.json({
      message: 'Habilidade deletada.'
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
