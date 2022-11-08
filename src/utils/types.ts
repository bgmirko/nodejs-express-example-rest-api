import { Request } from "express";
import { User } from "../database/modelsTypes";
import { RoleType } from "./enums";

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
