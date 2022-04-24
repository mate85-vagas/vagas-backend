import { Sequelize } from 'sequelize';
import { UserAttrs } from '../models/UserAttrs.js';
const { Op } = Sequelize;

//Builds where clause for job searching based on GET params
export const buildJobWhereClause = (req) => {
  var content = {};
  if (req.query.filter) {
    content = {
      [Op.or]: {
        title: {
          [Op.like]: `%${req.query.filter}%`
        },
        description: {
          [Op.like]: `%${req.query.filter}%`
        }
      }
    };
  }
  if (req.query.type) content.type = { [Op.like]: `%${req.query.type}%` };
  if ((req.query.min >= 0) & (req.query.max >= 0))
    content.salary = { [Op.between]: [parseFloat(req.query.min), parseFloat(req.query.max)] };
  if (req.query.site) content.site = { [Op.like]: `%${req.query.site}%` };
  if ((req.query.chmin >= 0) & (req.query.chmax >= 0))
    content.workload = { [Op.between]: [parseFloat(req.query.chmin), parseFloat(req.query.chmax)] };
  if (req.query.scholarity) content.scholarity = { [Op.like]: `%${req.query.scholarity}%` };
  if (req.query.createdAt) content.createdAt = req.query.createdAt;
  content.endingDate = {
    [Op.gte]: Sequelize.literal('NOW()')
  };

  return content;
};

//Builds where clause for profile searching based on GET params
export const buildProfileWhereClause = (req) => {
  var content = {};
  content.searchable = { [Op.eq]: true };
  if (req.query.scholarity) content.scholarity = { [Op.like]: `%${req.query.scholarity}%` };
  if (req.query.knowledge) content.knowledge = { [Op.like]: `%${req.query.knowledge}%` };
  if (req.query.technologies) content.technologies = { [Op.like]: `%${req.query.technologies}%` };
  if (req.query.languages) content.languages = { [Op.like]: `%${req.query.languages}%` };
  return content;
};

//Check if name is in req params
export const buildUserNameWhereClause = (req) => {
  if (req.query.name) return { [UserAttrs.name]: { [Op.like]: `%${req.query.name}%` } };
  else return undefined;
};
