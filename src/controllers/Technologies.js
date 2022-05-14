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

export const updateTechnology = async (req, res) => {
  try {
    const result = await repository.updateTechnology(req.body, req.params.id);
    if (result[0] == 1)
      res.json({
        message: 'Tecnologia atualizada.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteTechnology = async (req, res) => {
  try {
    const result = await repository.deleteTechnology(req.params.id);
    if (result)
      res.json({
        message: 'Tecnologia deletada.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

//Create multiple technologies on db at the same request
export const createBulkTechnologies = async (req, res) => {
  try {
    const technologies = await repository.createBulkTechnologies(req.body);
    if (technologies.length > 0)
      res.json({
        message: 'Tecnologias criadas.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
