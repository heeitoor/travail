import { config } from "dotenv";
config();

const { DATABASE_URL } = process.env;

module.exports = {
  test: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    searchPath: ["knex", "public"],
  },

  development: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    searchPath: ["knex", "public"],
  },

  staging: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    searchPath: ["knex", "public"],
  },

  production: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    searchPath: ["knex", "public"],
  },
};
