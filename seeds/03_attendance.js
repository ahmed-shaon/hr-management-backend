exports.seed = async function (knex) {
  await knex('attendance').del();

  // 20 attendance entries: employee_id 1-5, various dates in Jan-Feb 2025, varied check_in_time
  const rows = [
    { employee_id: 1, date: '2025-01-06', check_in_time: '2025-01-06T09:30:00.000Z' },
    { employee_id: 2, date: '2025-01-06', check_in_time: '2025-01-06T09:15:00.000Z' },
    { employee_id: 3, date: '2025-01-06', check_in_time: '2025-01-06T10:00:00.000Z' },
    { employee_id: 4, date: '2025-01-07', check_in_time: '2025-01-07T09:20:00.000Z' },
    { employee_id: 5, date: '2025-01-07', check_in_time: '2025-01-07T09:50:00.000Z' },
    { employee_id: 1, date: '2025-01-08', check_in_time: '2025-01-08T09:40:00.000Z' },
    { employee_id: 2, date: '2025-01-08', check_in_time: '2025-01-08T09:55:00.000Z' },
    { employee_id: 3, date: '2025-01-09', check_in_time: '2025-01-09T09:10:00.000Z' },
    { employee_id: 4, date: '2025-01-09', check_in_time: '2025-01-09T10:10:00.000Z' },
    { employee_id: 5, date: '2025-01-10', check_in_time: '2025-01-10T09:25:00.000Z' },
    { employee_id: 1, date: '2025-01-13', check_in_time: '2025-01-13T09:45:00.000Z' },
    { employee_id: 2, date: '2025-01-14', check_in_time: '2025-01-14T09:35:00.000Z' },
    { employee_id: 3, date: '2025-01-14', check_in_time: '2025-01-14T09:50:00.000Z' },
    { employee_id: 4, date: '2025-01-15', check_in_time: '2025-01-15T09:00:00.000Z' },
    { employee_id: 5, date: '2025-01-15', check_in_time: '2025-01-15T10:05:00.000Z' },
    { employee_id: 1, date: '2025-02-01', check_in_time: '2025-02-01T09:22:00.000Z' },
    { employee_id: 2, date: '2025-02-02', check_in_time: '2025-02-02T09:48:00.000Z' },
    { employee_id: 3, date: '2025-02-03', check_in_time: '2025-02-03T09:55:00.000Z' },
    { employee_id: 4, date: '2025-02-04', check_in_time: '2025-02-04T09:38:00.000Z' },
    { employee_id: 5, date: '2025-02-05', check_in_time: '2025-02-05T09:42:00.000Z' },
  ];

  await knex('attendance').insert(rows);
};
