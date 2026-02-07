exports.up = function (knex) {
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
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('attendance');
};
