import { connect, ConnectionPool } from 'mssql';
import dotenv from 'dotenv';
import sql, { config as SqlConfig, IResult } from 'mssql';


dotenv.config();

const dbConfig: SqlConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER as string,
  database: process.env.DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  pool:
  {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};


let pool: ConnectionPool;

const connectToDatabase = async () => {
  if (!pool) {
    pool = await connect(dbConfig);
  }
  return pool;
};

const query = async (queryText: string, params?: { [key: string]: any }): Promise<IResult<any>> => {
  try {
      const connection = await connectToDatabase();
      const request = connection.request();
      
      if (params) {
          for (const param in params) {
              request.input(param, params[param]);
          }
      }
      
      return await request.query(queryText);
  } catch (error) {
      console.error("Database query error:", error);
      throw error;
  }
};

const storedProc = async (procName: string, params?: { [key: string]: any }): Promise<IResult<any>> => {
  try {
      const connection = await connectToDatabase();
      const request = connection.request();
      
      if (params) {
          for (const param in params) {
              request.input(param, params[param]);
          }
      }
      
      return await request.execute(procName);
  } catch (error) {
      console.error("Database stored procedure error:", error);
      throw error;
  }
};

export default {
  query,
  storedProc,
  connectToDatabase
};

// export default class Db {

//     public static pool : ConnectionPool;

//     static connectionString = process.env.CONNECTION_STRING as string;

//     static async init(): Promise<void>{
//         if(!Db.pool){
//             Db.pool = await connect({
//                 server: process.env.SERVER as string,
//                 database: process.env.DATABASE as string,
//                 user: process.env.USER as string,
//                 password: process.env.PASSWORD as string,
//                 options:{
//                     encrypt: true,
//                     enableArithAbort: true,
//                     trustServerCertificate: true
//                 }
//             })
//             console.log("Connection established");
//         }
//     }


//     static async query(query: string, parameters: Record<string, { value: any, type: any }> = {}): Promise<any> {
//       await Db.init();
//       try {
//           const request = Db.pool.request();

//           for (const [key, parameter] of Object.entries(parameters)) {
//             const { value, type } = parameter;
//               request.input(key, type, value);
//           }

//           const result = await request.query(query);
//           return result.recordset; // Return the result set, not the entire response
//       } catch (err) {
//           console.error("Query Failed ", err);
//           throw err;
//       }
//   }


    // static async query(query: string): Promise<any>{
    //     await Db.init();
    //     try{
    //         const result = await Db.pool.request().query(query);
    //         return result;
    //     }catch(err){
    //         console.log("Query Failed ", err);   
    //         throw err;
    //     }
    // };
    

//     // Method to execute a stored procedure with parameters
//   static async executeStoredProc(procName: string, params: { [key: string]: any }): Promise<any> {
//     await Db.init(); 
//     try {
//       const request = Db.pool.request();

//     for (const [key, param] of Object.entries(params)) {
//       request.input(key, param);
//       console.log("(executeStoredProc)key:", key, "param:", param);
//     }
//       const result = await request.execute(procName);
//       return result?.recordset || [];
//     } catch (error) {
//       console.error("Stored procedure execution failed:", error);
//       throw error;
//     }
//   }
// }
