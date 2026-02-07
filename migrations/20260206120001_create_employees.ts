import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('employees', (table) => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable();
    table.integer('age').notNullable();
    table.string('designation').notNullable();
    table.date('hiring_date').notNullable();
    table.date('date_of_birth').notNullable();
    table.decimal('salary', 12, 2).notNullable();
    table.string('photo_path').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('employees');
}
