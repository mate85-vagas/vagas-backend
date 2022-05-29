import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { EmailListAttrs } from '../models/EmailListAttrs.js';

const { DataTypes } = Sequelize;
const EmailList = db.define('emailList', {
    [EmailListAttrs.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    [EmailListAttrs.email]: {
      type: DataTypes.STRING,
      allowNull: false
    },
    [EmailListAttrs.isActive]: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
});

export default EmailList;