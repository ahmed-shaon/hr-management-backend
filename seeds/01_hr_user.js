const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  await knex('hr_users').del();

  const users = [
    { email: 'admin@example.com', password: 'admin123', name: 'Admin' },
    { email: 'sarah@example.com', password: 'admin123', name: 'Sarah Johnson' },
    { email: 'mike@example.com', password: 'admin123', name: 'Mike Chen' },
    { email: 'priya@example.com', password: 'admin123', name: 'Priya Sharma' },
    { email: 'alex@example.com', password: 'admin123', name: 'Alex Rivera' },
  ];

  const hashed = await Promise.all(
    users.map(async (u) => ({
      email: u.email,
      password_hash: await bcrypt.hash(u.password, 10),
      name: u.name,
    }))
  );

  await knex('hr_users').insert(hashed);
};
