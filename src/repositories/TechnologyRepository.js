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
  return await Technology.update(body, {
    where: {
      [TechnologyAttrs.id]: id
    }
  });
};

const deleteTechnology = async (id) => {
  return await Technology.destroy({
    where: {
      [TechnologyAttrs.id]: id
    }
  });
};

const createBulkTechnologies = async (body) => {
  return await Technology.bulkCreate(body);
};

export default {
  updateTechnology,
  getAllTechnologies,
  getTechnologyById,
  deleteTechnology,
  createBulkTechnologies
};
