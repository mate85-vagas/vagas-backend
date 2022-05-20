import repository from '../repositories/SkillRepository.js';

export const getAllSkills = async (req, res) => {
  try {
    const skills = await repository.getAllSkills();
    res.json(skills);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const getSkillById = async (req, res) => {
  try {
    const skillInfo = await repository.getSkillById(req.params.id);
    if (skillInfo) res.json(skillInfo);
    else res.json({ message: 'Habilidade não encontrada.' });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const result = await repository.updateSkill(req.body, skillId);
    if (result[0] == 1) {
      res.json({
        message: 'Habilidade atualizada.'
      });
    } else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const result = await repository.deleteSkill(req.params.id);
    if (result)
      res.json({
        message: 'Habilidade deletada.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const createBulkSkills = async (req, res) => {
  try {
    const skills = await repository.createBulkSkills(req.body);
    if (skills.length > 0)
      res.json({
        message: 'Habilidades criadas.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
