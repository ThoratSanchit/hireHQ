import { sequelize } from "../plugins/sequelize";

// Import all models to ensure they are registered with the Sequelize instance
import "../models/candidate.models";
import "../models/job.model";

export const setupTestDatabase = async () => {
  // force: true will drop the table if it already exists
  await sequelize.sync({ force: true });
};

export const closeTestDatabase = async () => {
  await sequelize.close();
};
