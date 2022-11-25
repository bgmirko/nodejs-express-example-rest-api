import jwt from 'jsonwebtoken';
import type {Response, NextFunction} from 'express';
import {RequestCustom} from '../utils/types';
import {User} from '../database/modelsTypes';

export const authenticateUserToken = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction,
) => {
  const authHeader: string = req.headers['authorization'];
  const token: string = authHeader && authHeader.split(' ')[1];
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user: User) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
      },
    );
  } else {
    next();
  }
};
