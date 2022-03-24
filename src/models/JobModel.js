import { Sequelize } from 'sequelize';
import  db  from '../config/database.js';
import  User  from './UserModel.js';
import { JobAttrs } from './JobAttrs.js';
 
const { DataTypes } = Sequelize;
 
const Job = db.define('job',{
    [JobAttrs.id]:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    [JobAttrs.description]:{
        type: DataTypes.TEXT,
        allowNull: false
    }, 
    [JobAttrs.scholarity]:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    [JobAttrs.title]:{
        type: DataTypes.STRING(60),
        allowNull: false
    },
    [JobAttrs.type]:{
        type: DataTypes.STRING(12),
        allowNull: false
    },
    [JobAttrs.site]:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    [JobAttrs.workload]:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    [JobAttrs.salary]:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    [JobAttrs.endingDate]:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    [JobAttrs.startingDate]:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

User.hasMany(Job);
Job.belongsTo(User);
 
export default Job;