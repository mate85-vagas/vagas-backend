import db from '../config/database.js';

//Authenticate with db and sync tables with models
const connect = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Database connected...');
  } catch (error) {
    console.error('Connection error:', error);
  }
};

export default connect;
