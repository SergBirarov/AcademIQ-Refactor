import { saveUser } from './user.db';
import bcrypt from "bcrypt";

const saltRounds = 10;

export type UserType = {
  UserId: number,
  UserEmail: string,
  PasswordHash: string,
  Role_Code: number,
}

export async function addUser({ UserId, UserEmail,
   PasswordHash, Role_Code, }: UserType): Promise<any> {

       PasswordHash = await passwordEncryption(PasswordHash);

  try {
    return await saveUser({
      UserId,
      UserEmail,
      PasswordHash,
      Role_Code
    });

  } catch (error) {
    console.log(error); console.error("Error in addUser function:", error); // Log the error
    throw new Error("Failed to add user"); 
  }
};

const passwordEncryption = async(password: string): Promise<string> => {

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;

}