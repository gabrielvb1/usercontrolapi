"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = __importDefault(require("../controller/Users"));
const LoginAuth_1 = __importDefault(require("../middleware/LoginAuth"));
const router = (0, express_1.Router)();
router.post('/signup', Users_1.default.signUp);
router.post('/login', Users_1.default.login);
router.use(LoginAuth_1.default);
router.get('/users', Users_1.default.getAllUsers);
router.post('/users', Users_1.default.createUserByLoggedUser);
router.put('/users/:id', Users_1.default.updateUser);
router.delete('/users/:id', Users_1.default.deleteUser);
exports.default = router;
