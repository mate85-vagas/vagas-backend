import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { UserAttrs } from './UserAttrs.js';

const { DataTypes } = Sequelize;

const User = db.define('user', {
  [UserAttrs.id]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  [UserAttrs.name]: {
    type: DataTypes.STRING,
    allowNull: false
  },
  [UserAttrs.email]: {
    type: DataTypes.STRING,
    allowNull: false
  },
  [UserAttrs.password]: {
    type: DataTypes.STRING,
    allowNull: false
  },
  [UserAttrs.isAdmin]: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  },
  [UserAttrs.isAuthorized]: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  }
});

export default User;
