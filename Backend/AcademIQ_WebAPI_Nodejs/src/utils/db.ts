import { connect, ConnectionPool } from 'mssql';
import { Employee } from '../types/employee.type';
import dotenv from 'dotenv';


dotenv.config();

export default class Db {

    private static pool : ConnectionPool;

    static connectionString = process.env.CONNECTION_STRING as string;

    static async init(): Promise<void>{
        if(!Db.pool){
            Db.pool = await connect({
                server: process.env.SERVER as string,
                database: process.env.DATABASE as string,
                user: process.env.USER as string,
                password: process.env.PASSWORD as string,
                options:{
                    encrypt: true,
                    enableArithAbort: true,
                    trustServerCertificate: true
                }
            })
            console.log("Connection established");
        }
    }

    static async query(query: string): Promise<any>{
        await Db.init();
        try{
            const result = await Db.pool.request().query(query);
            return result.recordset;
        }catch(err){
            console.log("Query Failed ", err);   
            throw err;
        }
    };
    

    // Method to execute a stored procedure with parameters
  static async executeStoredProc(procName: string, params: { [key: string]: any }): Promise<any> {
    await Db.init(); 
    try {
      const request = Db.pool.request();
      // request.input('UserId', params.UserId);
      // request.input('UserEmail', params.UserEmail);
      // request.input('PasswordHash', params.PasswordHash);
      // request.input('Role_Code', params.Role_Code);
      // // Add each parameter to the request
      // for (const [key, value] of Object.entries(params)) {
      //   request.input(key, value);
      // }

      // Add each parameter to the request
    for (const [key, param] of Object.entries(params)) {
      // Check if the parameter is an object with a 'value' property; if so, use 'value'
      request.input(key, param.value);
    }
      console.log(request);
      const result = await request.execute(procName);
      return result.recordset;
    } catch (error) {
      console.error("Stored procedure execution failed:", error);
      throw error;
    }
  }
}

    // static async selectData(query: string): Promise<Employee[] | undefined> {
    //     try {
    //         const pool = await connect(Db.connectionString);
    //         const result = await pool.request().query(query);
    //         let data = result.recordset;
    //         let employees: Employee[] = [];
    //         for (let index = 0; index < data.length; index++) {
    //             const element = data[index];
    //             employees.push({
    //                 id: element.id,
    //                 first_name: element.first_name,
    //                 last_name: element.last_name,
    //                 birthday: new Date(element.birthday)
    //             });
    //         }
    //         return employees;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

//     static async insertData_NotSecure(table: string, params: {}): Promise<any> {
//         try {
//             let query = ``;
//             switch (table) {
//                 case 'Employee':
//                     query = 'exec InsertEmployee ';
//                     break;
//                 default:
//                     break;
//             }

//             for (const [key, value] of Object.entries(params)) {
//                 query += `@${key}='${value}',`;
//             }
//             query = query.slice(0, -1);

//             console.log('query', query);
//             // const pool = await connect(Db.connectionString);
//             // return await pool.request().query(query);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     static async insertEmployee(procName: string, emp: Employee): Promise<any> {
//         try {
//             const pool = await connect(Db.connectionString);

//             return await pool.request()
//                 .input('id', emp.id)
//                 .input('first_name', emp.first_name)
//                 .input('last_name', emp.last_name)
//                 .input('birthday', emp.birthday)
//                 .execute(procName);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     static async deleteEmployees(procName: string): Promise<any> {
//         try {
//             const pool = await connect(Db.connectionString);

//             return await pool.request()
//                 .execute(procName);
//         } catch (err) {
//             console.log(err);
//         }
//     }

// }