import repository from '../repositories/TechnologyRepository.js';
 
export const getAllTechnologies = async (req, res) => {
    try {
      const technologies = await repository.getAllTechnologies();
      res.json(technologies);
    } catch (error) {
      res.json({ message: error.message });
    }
};

export const getTechnologyById = async (req, res) => {
    try {
      const technology = await repository.getTechnologyById(req.params.id);
      res.json(technology);
    } catch (error) {
      res.json({ message: error.message });
    }
};

export const updateTechnology = async (req, res) => {
    try {
        await Technology.update(req.body, {
            where: {
                [TechnologyModel.id]: req.params.id
            }
        });
        res.json({
            "message": "Tecnologia atualizada."
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
};

export const deleteTechnology = async (req, res) => {
    try {
      await repository.deleteTechnology(req.params.id);
      res.json({
        message: 'Tecnologia deletada.'
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };