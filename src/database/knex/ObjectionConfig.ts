import { Model } from 'objection';
import { Knex } from './index';

Model.knex(Knex);

export { Model };
