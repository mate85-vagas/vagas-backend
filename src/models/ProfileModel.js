import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { ProfileAttrs } from './ProfileAttrs.js';
import User from './UserModel.js';

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
  [ProfileAttrs.scholarity]: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  [ProfileAttrs.knowledge]: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  [ProfileAttrs.technologies]: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  [ProfileAttrs.languages]: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  [ProfileAttrs.linkResume]: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  [ProfileAttrs.searchable]: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

//1:1 association
User.hasOne(Profile, { onDelete: 'CASCADE', foreignKey: { unique: true } });
Profile.belongsTo(User, { onDelete: 'CASCADE', foreignKey: { unique: true } });

export default Profile;
