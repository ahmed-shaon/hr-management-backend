/**
 * One-off: updates knex_migrations.name from *.js to *.ts so Knex finds .ts files
 * after switching migrations from JS to TS. Run once: node scripts/fix-migration-names.js
 */
require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_URL,
});

const tableName = 'knex_migrations';

knex
  .raw(
    `UPDATE ?? SET name = REPLACE(name, '.js', '.ts') WHERE name LIKE '%.js'`,
    [tableName]
  )
  .then((result) => {
    const rowCount = result?.rowCount ?? 0;
    console.log(`Updated ${rowCount} migration name(s) from .js to .ts`);
    return knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
