import { knex } from 'knex';
import dotenv from 'dotenv';
import { development, test } from './Environment';

dotenv.config();

function getEnviroment() {
  if (process.env.NODE_ENV === 'test') {
    return test;
  } else {
    return development;
  }
}
export const Knex = knex(getEnviroment());
