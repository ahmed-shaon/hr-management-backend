import knex, { type Knex } from 'knex';

const connection =
  process.env.DB_URL ||
  'postgresql://postgres:postgres@localhost:5432/hr-management-system';

const config: Knex.Config = {
  client: 'pg',
  connection,
  pool: { min: 1, max: 5 },
};

const db: Knex = knex(config);

export default db;
