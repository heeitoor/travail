import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const defaultUserData = {
    password: 'b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c', //senha
    type: 'ADMIN',
    active: true,
  };

  const users = [
    { id: 1, email: 'heitor@travail.com', name: 'Heitor', ...defaultUserData },
    { id: 2, email: 'rafael@travail.com', name: 'Rafael', ...defaultUserData },
    { id: 3, email: 'wisley@travail.com', name: 'Wisley', ...defaultUserData },
    { id: 4, email: 'customer@travail.com', name: 'Customer', type: 'CUSTOMER', ...defaultUserData },
    { id: 5, email: 'professional@travail.com', name: 'Professional', type: 'PROFESSIONAL', ...defaultUserData },
    { id: 6, email: 'company@travail.com', name: 'Company', type: 'COMPANY', ...defaultUserData },
  ];

  await knex('user').del();
  await knex('user').insert(users);
  await knex.raw(`ALTER SEQUENCE user_id_seq RESTART WITH ${users.length + 1}`);
}
