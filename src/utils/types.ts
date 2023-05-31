import {Request} from 'express';
import {RoleType} from './enums';
import User from '../database/models/user';

export interface RequestCustom extends Request {
  user: User;
}

export interface TokenUserPayload {
  uuid: string;
  role: RoleType;
}

export interface TokenData {
  uuid: string;
  role: RoleType;
  iat: string;
  exp: string;
}

export interface IRequestQuery {
  cursor?: number;
  limit?: number;
}
