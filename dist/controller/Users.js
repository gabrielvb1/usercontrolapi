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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
class Users {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loggedUser = req.user;
                if (!loggedUser) {
                    res.status(401).send({ error: 'Usuário não autenticado' });
                    return;
                }
                let users;
                if (loggedUser.type === 'admin') {
                    users = yield UserModel_1.UserModel.query().select('*');
                }
                else {
                    if (!loggedUser.id) {
                        res.status(400).send({ error: 'Usuário inválido' });
                        return;
                    }
                    users = yield UserModel_1.UserModel.query().where('created_by', loggedUser.id);
                }
                res.status(200).send(users);
            }
            catch (error) {
                res.status(500).send({ error: 'Erro ao buscar usuários' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield UserModel_1.UserModel.query().findOne({ email });
                if (!user) {
                    res.status(401).send({ error: 'Usuário não encontrado' });
                    return;
                }
                const validPassword = password === user.password;
                if (!validPassword) {
                    res.status(401).send({ error: 'Senha inválida' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, type: user.type }, secret, {
                    expiresIn: '8h',
                });
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(500).send({ error: 'Erro no login' });
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!password) {
                    res.status(400).send({ error: 'Senha é obrigatória para cadastro' });
                }
                yield UserModel_1.UserModel.query().insert({
                    name,
                    email,
                    password,
                    type: 'user',
                    created_by: null,
                });
                res.status(201).send({ message: 'Conta criada com sucesso' });
            }
            catch (error) {
                res.status(500).send({ error: 'Erro ao criar conta' });
            }
        });
    }
    createUserByLoggedUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { name, email, type } = req.body;
                const createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!createdBy) {
                    res.status(403).send({ error: 'Usuário não autorizado' });
                }
                yield UserModel_1.UserModel.query().insert({
                    name,
                    email,
                    type: type || 'user',
                    password: null,
                    created_by: createdBy
                });
                res
                    .status(201)
                    .send({ message: 'Usuário criado com sucesso pelo admin' });
            }
            catch (error) {
                res.status(500).send({ error: 'Erro ao criar usuário' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, type, password } = req.body;
                const user = yield UserModel_1.UserModel.query().findById(id);
                if (!user) {
                    res.status(404).json({ error: 'Usuário não encontrado' });
                    return;
                }
                yield UserModel_1.UserModel.query().findById(id).patch({
                    name,
                    email,
                    type,
                    password,
                });
                res.send({ message: 'Usuário atualizado com sucesso' });
            }
            catch (error) {
                res.status(500).send({ error: 'Erro ao atualizar usuário' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield UserModel_1.UserModel.query().findById(id);
                if (!user) {
                    res.status(404).json({ error: 'Usuário não encontrado' });
                    return;
                }
                yield UserModel_1.UserModel.query().deleteById(id);
                res.send({ message: 'Usuário deletado com sucesso' });
            }
            catch (error) {
                res.status(500).send({ error: 'Erro ao deletar usuário' });
            }
        });
    }
}
exports.default = new Users();
