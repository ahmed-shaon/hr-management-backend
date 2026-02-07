import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('attendance', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('employee_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('employees')
      .onDelete('RESTRICT');
    table.date('date').notNullable();
    table.timestamp('check_in_time').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['employee_id', 'date']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('attendance');
}
