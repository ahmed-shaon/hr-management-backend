const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  await knex('hr_users').del();
  const passwordHash = await bcrypt.hash('admin123', 10);
  await knex('hr_users').insert({
    email: 'admin@example.com',
    password_hash: passwordHash,
    name: 'Admin',
  });
};
