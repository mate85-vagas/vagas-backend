import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { ProfileAttrs } from './ProfileAttrs.js';

const { DataTypes } = Sequelize;

const Profile = db.define('profile', {
    [ProfileAttrs.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    [ProfileAttrs.birthDate]: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    [ProfileAttrs.knowledge]: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    [ProfileAttrs.technologies]: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    [ProfileAttrs.languages]: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    [ProfileAttrs.linkResume]: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
  });
  
  export default Profile;