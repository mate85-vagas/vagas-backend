import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import { TokenAttrs } from './TokenAttrs';
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const Token = db.define('token', {
  [TokenAttrs.id]: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  [TokenAttrs.expiration]: {
    type: DataTypes.DATE,
    allowNull: false
  },
  [TokenAttrs.token]: {
    type: DataTypes.STRING,
    allowNull: false
  },
  [TokenAttrs.userId]: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

//1:1 association
User.hasOne(Token, { onDelete: 'CASCADE', foreignKey: { unique: true } });
Token.belongsTo(User, { onDelete: 'CASCADE', foreignKey: { unique: true } });

export default Token;
