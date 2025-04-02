import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: number;
  type: string; 
}

export default async function loginAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: 'Token não enviado' });
    return;
  }

  const token = (authorization ?? '').split(' ')[1];

  try {
    const { id, type } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    
    req.user = { id, type };
    return next();
  } catch (error) {
    res.status(401).send({ error: 'Token inválido ou expirado' });
  }
}