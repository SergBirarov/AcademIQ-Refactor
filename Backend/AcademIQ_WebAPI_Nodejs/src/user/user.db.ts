import { UserType } from "./user.model";
import Db from "../utils/db";
import { connect } from "mssql";
import dotenv from "dotenv";


/**
 * Saves a user to the database.
 *
 * @param {UserType} user - The user object to save.
 * @param {string} procName - The stored procedure name.
 * @return {Promise<any>} The result of the database operation.
 */
export async function saveUser(user: UserType): Promise<any> {
  try {
    console.log('UserId:', user.UserId,
     ' UserEmail:', user.UserEmail,
      'PasswordHash:', user.PasswordHash,
      'Role_Code:', user.Role_Code)
    const result = await Db.executeStoredProc('AddUser', {
      UserId: user.UserId,
      UserEmail: user.UserEmail,
      PasswordHash: user.PasswordHash,
      Role_Code: user.Role_Code.
    });
    return result;
  } catch (error) {
    console.error("Error in saveUser function:", error); // Log the error
    throw new Error("Failed to save user in database");
  }
}
    
