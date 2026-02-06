import knex, { type Knex } from 'knex';

const connection: Knex.PgConnectionConfig | string = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : {
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT) ?? 5432,
      user: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_DATABASE ?? 'hr-management-system',
    };

const config: Knex.Config = {
  client: 'pg',
  connection,
  pool: { min: 1, max: 5 },
};

const db: Knex = knex(config);

export default db;
