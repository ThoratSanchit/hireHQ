import dotenv from 'dotenv';
 
dotenv.config();
 
export const config = {
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};
