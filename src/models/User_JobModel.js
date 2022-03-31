import { Sequelize } from 'sequelize';
import { User_JobAttrs } from '../models/User_JobAttrs.js';
import db from '../config/database.js';
import User from './UserModel.js';
import Job from './JobModel.js';

const { DataTypes } = Sequelize;

const User_Job = db.define(
  'user_job',
  {
    [User_JobAttrs.created]: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: false }
);

User.belongsToMany(Job, { through: User_Job });
Job.belongsToMany(User, { through: User_Job });
User_Job.belongsTo(Job);
User_Job.belongsTo(User);
Job.hasMany(User_Job);
User.hasMany(User_Job);

export default User_Job;
