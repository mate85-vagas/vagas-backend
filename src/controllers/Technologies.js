import repository from '../repositories/TechnologyRepository.js';

export const getAllTechnologies = async (req, res) => {
  try {
    const technologies = await repository.getAllTechnologies();
    res.json(technologies);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const getTechnologyById = async (req, res) => {
  try {
    const technology = await repository.getTechnologyById(req.params.id);
    res.json(technology);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const createTechnology = async (req, res) => {
  try {
    await repository.createTechnology(req.body);
    res.json({
      message: 'Tecnologia criada.'
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateTechnology = async (req, res) => {
  try {
    await repository.updateTechnology(req.body, req.params.id);
    res.json({
      message: 'Tecnologia atualizada.'
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteTechnology = async (req, res) => {
  try {
    await repository.deleteTechnology(req.params.id);
    res.json({
      message: 'Tecnologia deletada.'
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
