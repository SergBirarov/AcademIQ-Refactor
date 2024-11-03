import { UserType } from "./user.model";
import Db from "../utils/db";

/**
 * Saves a user to the database.
 *
 * @param {UserType} user - The user object to save.
 * @param {string} procName - The stored procedure name.
 * @return {Promise<any>} The result of the database operation.
 */
export async function saveUser(user: UserType): Promise<any> {
  try {
    const result = await Db.executeStoredProc('AddUser', user);
    console.log("(saveUser)result:", result);
    const status = result[0]?.status;

    if (status === 'User already exists')
      {
      return { message: 'User already exists' };
      }
    return {message: 'User created successfully'};
  } catch (error) {
    console.error("Error in saveUser function:", error); // Log the error
    throw new Error("Failed to save user in database");
  }
}
    
