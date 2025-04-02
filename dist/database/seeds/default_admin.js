"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const UserModel_1 = require("../../models/UserModel");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield UserModel_1.UserModel.query()
            .where({ email: 'admin@spsgroup.com.br' })
            .first();
        if (!existingUser) {
            yield knex('users').insert({
                name: 'admin',
                email: 'admin@spsgroup.com.br',
                type: 'admin',
                password: '1234',
                created_by: null
            });
        }
    });
}
