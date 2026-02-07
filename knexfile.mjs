import 'dotenv/config';

const connection = process.env.DB_URL;
export default {
  development: {
    client: 'pg',
    connection,
    pool: { min: 1, max: 5 },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.ts'],
      extension: 'ts',
    },
    seeds: { directory: './seeds' },
  },
  production: {
    client: 'pg',
    connection,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.ts'],
      extension: 'ts',
    },
    seeds: { directory: './seeds' },
  },
};
