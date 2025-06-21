import { Sequelize } from 'sequelize';
import { config } from '../config/db';
import dotenv from 'dotenv';

dotenv.config(); // Ensure .env variables are loaded

let sequelize: Sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize('sqlite::memory:', {
    logging: false, // Disable logging for tests or use console.log for debugging
  });
} else {
  sequelize = new Sequelize(
    config.database.database || '',
    config.database.user || '',
    config.database.password,
    {
      host: config.database.host,
      dialect: 'mysql',
      logging: console.log, // Or false to disable logging
    }
  );
}

// Models will be imported by the test setup utility or by the application code as needed.
// No global model imports here to avoid side effects during testing module loading.

const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    return { connected: true, message: 'Database connected successfully' };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return { connected: false, message: 'Database connection failed', error };
  }
};

export { sequelize, checkDatabaseConnection };
