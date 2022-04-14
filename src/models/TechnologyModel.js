import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { TechnologyAttrs } from './TechnologyAttrs.js';

const { DataTypes } = Sequelize;

const Technology = db.define('technology', {
  [TechnologyAttrs.id]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  [TechnologyAttrs.description]: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Technology;
