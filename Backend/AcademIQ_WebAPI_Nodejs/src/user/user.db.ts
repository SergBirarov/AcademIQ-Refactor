import { UserType } from "./user.model";
import Db from "../utils/db";



export async function addUser(userData: UserType){
  return Db.storedProc('AddUser', userData);
}

export async function getUserById(UserId: number){
  return Db.storedProc('GetUserById', {UserId: UserId});
}
export async function getUserByEmail(UserEmail: string){
  return Db.storedProc('GetUserByEmail', { UserEmail: UserEmail });
};

export async function updateUser(userData: any){
  return Db.storedProc('UpdateUser',{data: userData})
}

