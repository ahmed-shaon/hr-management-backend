import 'dotenv/config';

const connection = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'hr-management-system',
    };

export default {
  development: {
    client: 'pg',
    connection,
    pool: { min: 1, max: 5 },
    migrations: { directory: './migrations', tableName: 'knex_migrations' },
    seeds: { directory: './seeds' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || connection,
    pool: { min: 2, max: 10 },
    migrations: { directory: './migrations', tableName: 'knex_migrations' },
    seeds: { directory: './seeds' },
  },
};
