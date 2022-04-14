import Technology from '../models/TechnologyModel.js';
import { TechnologyAttrs } from '../models/TechnologyAttrs.js';

const getTechnologyById = async (id) => {
  const technology = await Technology.findOne({
    where: {
      [TechnologyAttrs.id]: id
    }
  });
  return technology;
};

const getAllTechnologies = async () => {
  const technologies = await Technology.findAndCountAll();
  return technologies;
};

const updateTechnology = async (body, id) => {
  await Technology.update(body, {
    where: {
      [TechnologyAttrs.id]: id
    }
  });
};

const deleteTechnology = async (id) => {
  await Technology.destroy({
    where: {
    [TechnologyAttrs.id]: id
    }
  });
};

export default { updateTechnology, getAllTechnologies, getTechnologyById, deleteTechnology };