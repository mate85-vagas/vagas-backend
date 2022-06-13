import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

//const db = new Sequelize(process.env.CLEARDB_DATABASE_URL);

const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  port: '3306'
});

export default db;
