import { Model } from '../database/knex/ObjectionConfig';

export class UserModel extends Model {
  static tableName = 'users';
  id!: number
  name!: string;
  email!: string;
  password!: string | null
  type!: string
  created_by!: number | null;

}
