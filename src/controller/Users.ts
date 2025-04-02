import { UserModel } from '../models/UserModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET as string;
class Users {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const loggedUser = req.user;
      if (!loggedUser) {
        res.status(401).send({ error: 'Usuário não autenticado' });
        return;
      }

      let users;
      if (loggedUser.type === 'admin') {
        users = await UserModel.query().select('*');
      } else {
        if (!loggedUser.id) {
          res.status(400).send({ error: 'Usuário inválido' });
          return;
        }

        users = await UserModel.query().where('created_by', loggedUser.id);
      }

      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: 'Erro ao buscar usuários' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserModel.query().findOne({ email });
      if (!user) {
        res.status(401).send({ error: 'Usuário não encontrado' });
        return;
      }

      const validPassword = password === user.password;
      if (!validPassword) {
        res.status(401).send({ error: 'Senha inválida' });
        return;
      }

      const token = jwt.sign({ id: user.id, type: user.type }, secret, {
        expiresIn: '8h',
      });

      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({ error: 'Erro no login' });
    }
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!password) {
        res.status(400).send({ error: 'Senha é obrigatória para cadastro' });
      }

      await UserModel.query().insert({
        name,
        email,
        password,
        type: 'user',
        created_by: null,
      });

      res.status(201).send({ message: 'Conta criada com sucesso' });
    } catch (error) {
      res.status(500).send({ error: 'Erro ao criar conta' });
    }
  }


  async createUserByLoggedUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, type } = req.body;
      const createdBy = req.user?.id;
      if (!createdBy) {
        res.status(403).send({ error: 'Usuário não autorizado' });
      }

      await UserModel.query().insert({
        name,
        email,
        type: type || 'user',
        password: null,
        created_by: createdBy
      });

      res
        .status(201)
        .send({ message: 'Usuário criado com sucesso pelo admin' });
    } catch (error) {
      res.status(500).send({ error: 'Erro ao criar usuário' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, type, password } = req.body;

      const user = await UserModel.query().findById(id);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      await UserModel.query().findById(id).patch({
        name,
        email,
        type,
        password,
      });

      res.send({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      res.status(500).send({ error: 'Erro ao atualizar usuário' });
    }
  }


  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; 

      const user = await UserModel.query().findById(id);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      await UserModel.query().deleteById(id);

      res.send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).send({ error: 'Erro ao deletar usuário' });
    }
  }
}

export default new Users();
