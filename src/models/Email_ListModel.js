import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { Email_ListAttrs } from '../models/Email_ListAttrs.js';

const { DataTypes } = Sequelize;
const Email_List = db.define('email_list', {
    [Email_ListAttrs.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    [Email_ListAttrs.email]: {
      type: DataTypes.STRING,
      allowNull: false
    },
    [Email_ListAttrs.isActive]: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
});

export default Email_List;