exports.seed = async function (knex) {
  await knex('employees').del();

  await knex('employees').insert([
    {
      name: 'Rahim Ahmed',
      age: 32,
      designation: 'Software Engineer',
      hiring_date: '2022-01-15',
      date_of_birth: '1992-05-10',
      salary: '75000.00',
      photo_path: null,
    },
    {
      name: 'Fatima Khan',
      age: 28,
      designation: 'HR Manager',
      hiring_date: '2021-06-01',
      date_of_birth: '1996-11-22',
      salary: '65000.00',
      photo_path: null,
    },
    {
      name: 'Karim Rahman',
      age: 35,
      designation: 'Senior Developer',
      hiring_date: '2019-03-10',
      date_of_birth: '1989-08-05',
      salary: '95000.00',
      photo_path: null,
    },
    {
      name: 'Ayesha Siddique',
      age: 26,
      designation: 'Junior Developer',
      hiring_date: '2023-02-20',
      date_of_birth: '1998-01-14',
      salary: '55000.00',
      photo_path: null,
    },
    {
      name: 'Rahim Hassan',
      age: 30,
      designation: 'Project Manager',
      hiring_date: '2020-09-01',
      date_of_birth: '1994-07-30',
      salary: '82000.00',
      photo_path: null,
    },
  ]);
};
