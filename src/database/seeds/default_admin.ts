import { Knex } from 'knex';
import { UserModel } from '../../models/UserModel';

export async function seed(knex: Knex): Promise<void> {
  const existingUser = await UserModel.query()
    .where({ email: 'admin@spsgroup.com.br' })
    .first();
  if (!existingUser) {
    await knex('users').insert({
      name: 'admin',
      email: 'admin@spsgroup.com.br',
      type: 'admin',
      password: '1234',
      created_by: null
    });
  }
}
