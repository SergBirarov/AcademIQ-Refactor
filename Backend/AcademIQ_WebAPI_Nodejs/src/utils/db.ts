import { connect, ConnectionPool } from 'mssql';
import dotenv from 'dotenv';


dotenv.config();

export default class Db {

    public static pool : ConnectionPool;

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


    static async query(query: string, parameters: Record<string, { value: any, type: any }> = {}): Promise<any> {
      await Db.init();
      try {
          const request = Db.pool.request();

          for (const [key, parameter] of Object.entries(parameters)) {
            const { value, type } = parameter;
              request.input(key, type, value);
          }

          const result = await request.query(query);
          return result.recordset; // Return the result set, not the entire response
      } catch (err) {
          console.error("Query Failed ", err);
          throw err;
      }
  }


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
    

    // Method to execute a stored procedure with parameters
  static async executeStoredProc(procName: string, params: { [key: string]: any }): Promise<any> {
    await Db.init(); 
    try {
      const request = Db.pool.request();

    for (const [key, param] of Object.entries(params)) {
      request.input(key, param);
      console.log("(executeStoredProc)key:", key, "param:", param);
    }
      const result = await request.execute(procName);
      return result?.recordset || [];
    } catch (error) {
      console.error("Stored procedure execution failed:", error);
      throw error;
    }
  }
}
