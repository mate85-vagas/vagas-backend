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
        type: DataTypes.INTEGER
    },
    [ProfileAttrs.knowledge]: {
        type: DataTypes.ARRAY(DataTypes.STRING(30))
    },
    [ProfileAttrs.technologies]: {
        type: DataTypes.ARRAY(DataTypes.STRING(30))
    }
  });
  
  export default Profile;