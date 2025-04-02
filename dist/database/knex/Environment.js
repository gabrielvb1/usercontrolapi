"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.development = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.development = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path_1.default.resolve(__dirname, '../../../database.sqlite'),
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, '../migrations'),
        extension: 'ts',
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, '../seeds'),
        extension: 'ts',
    },
    pool: {
        afterCreate: (connection, done) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        },
    },
};
exports.test = Object.assign(Object.assign({}, exports.development), { connection: ':memory:' });
