// import { UserType } from './user.model';
import * as userDb from './user.db';
import bcrypt from "bcrypt";
import Db from '../utils/db';

// const saltRounds = 10;

export type UserType = {
  UserId: number,
  UserEmail: string,
  PasswordHash: string,
  Role_Code: number,
}

export async function addUser(userData: UserType){
  return await userDb.addUser(userData);
}

export async function getUserById(UserId: number){
  const result = await userDb.getUserById(UserId);
  return result.recordset[0];
};

export async function getUserByEmail(UserEmail: string){
  const result = await userDb.getUserByEmail(UserEmail);
  return result.recordset[0];
};

export async function updateUser(userData: UserType){
  return await userDb.updateUser(userData);
}

