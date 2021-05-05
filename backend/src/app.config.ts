import { config } from "dotenv";

config();

const appConfig = {
  DATABASE_URL: process.env.DATABASE_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  NODE_ENV: process.env.NODE_ENV,
  SENDGRID_KEY: process.env.SENDGRID_KEY,
  SENDGRID_DEFAULT_SENDER: process.env.SENDGRID_DEFAULT_SENDER,
};

interface KnexConfig {
  development: any;
}

export { appConfig, KnexConfig };
