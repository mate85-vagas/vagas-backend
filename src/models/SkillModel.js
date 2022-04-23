import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { SkillAttrs } from './SkillAttrs.js';

const { DataTypes } = Sequelize;

const Skill = db.define(
  'skill',
  {
    [SkillAttrs.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    [SkillAttrs.description]: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  },
  { timestamps: false }
);

export default Skill;
