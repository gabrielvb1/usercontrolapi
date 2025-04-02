"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const objection_1 = require("objection");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return objection_1.Model; } });
const index_1 = require("./index");
objection_1.Model.knex(index_1.Knex);
