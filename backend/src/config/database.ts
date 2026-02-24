import { Sequelize } from 'sequelize';

// Initialize connection to SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite',  // Update this path as necessary
});

// Load schema functionality (example)
const initializeSchema = async () => {
  try {
    // Load your models here and sync the database
    await sequelize.sync();
    console.log('Database schema loaded successfully.');
  } catch (error) {
    console.error('Error loading schema:', error);
  }
};

export { sequelize, initializeSchema };