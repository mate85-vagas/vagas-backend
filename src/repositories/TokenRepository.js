import Token from '../models/TokenModel.js';
import { Sequelize } from 'sequelize';
import { TokenAttrs } from '../models/TokenAttrs.js';
const { Op } = Sequelize;

const createToken = async (userId, token) => {
  const token_object = await Token.create({
    userId: userId,
    [TokenAttrs.token]: token,
    [TokenAttrs.expiration]: Sequelize.fn(
      'DATE_ADD',
      Sequelize.literal('NOW()'),
      Sequelize.literal('INTERVAL 15 MINUTE')
    )
  });
  return token_object;
};

const checkToken = async (token) => {
  const token_object = await Token.findOne({
    where: {
      [TokenAttrs.token]: token,
      [TokenAttrs.expiration]: { [Op.gt]: Sequelize.literal('NOW()') }
    }
  });
  return token_object;
};

const deleteExpiredTokens = async () => {
  const result = await Token.destroy({
    where: {
      [TokenAttrs.expiration]: { [Op.lt]: Sequelize.literal('NOW()') }
    }
  });
  return result;
};

const deleteToken = async (token) => {
  const result = await Token.destroy({
    where: {
      [TokenAttrs.token]: token
    }
  });
  return result;
};

export default { createToken, deleteExpiredTokens, checkToken, deleteToken };
