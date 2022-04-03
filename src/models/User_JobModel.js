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

//Super M:N association
User.belongsToMany(Job, { through: User_Job }, { onDelete: 'CASCADE' });
Job.belongsToMany(User, { through: User_Job }, { onDelete: 'CASCADE' });
User_Job.belongsTo(Job, { onDelete: 'CASCADE' });
User_Job.belongsTo(User, { onDelete: 'CASCADE' });
Job.hasMany(User_Job, { onDelete: 'CASCADE' });
User.hasMany(User_Job, { onDelete: 'CASCADE' });

export default User_Job;
