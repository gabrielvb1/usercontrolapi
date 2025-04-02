"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const ObjectionConfig_1 = require("../database/knex/ObjectionConfig");
class UserModel extends ObjectionConfig_1.Model {
}
exports.UserModel = UserModel;
UserModel.tableName = 'users';
