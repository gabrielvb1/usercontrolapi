"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knex = void 0;
const knex_1 = require("knex");
const dotenv_1 = __importDefault(require("dotenv"));
const Environment_1 = require("./Environment");
dotenv_1.default.config();
function getEnviroment() {
    if (process.env.NODE_ENV === 'test') {
        return Environment_1.test;
    }
    else {
        return Environment_1.development;
    }
}
exports.Knex = (0, knex_1.knex)(getEnviroment());
