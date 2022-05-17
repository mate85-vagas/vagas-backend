import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { TokenAttrs } from './TokenAttrs';

const { DataTypes } = Sequelize;

const Token = db.define('token', {
  [TokenAttrs.id]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  [TokenAttrs.expiration]: {
    type: DataTypes.DATE,
    allowNull: false
  },
  [TokenAttrs.token]: {
    type: DataTypes.STRING,
    allowNull: false
  },
  [TokenAttrs.userId]: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default Token;
