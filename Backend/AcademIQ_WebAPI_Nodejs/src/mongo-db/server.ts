import { MongoClient, Db } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

let db: Db | null = null;

const uri = process.env.MONGOURI as string;
const client = new MongoClient(uri);

const dbName = 'AcademIQ';


const connectToServer = async () => {
  try {
    if (!db) {
      await client.connect();
      db = client.db(dbName);
      console.log(`[MongoDB] Connected to ${dbName}`);
    }
  } catch (error) {
    console.error("[MongoDB] Could not connect to MongoDB:", error);
    process.exit(1); 
  }
};

const getDb = (): Db => {
  if (!db) {
    throw new Error('[MongoDB] Database not connected');
  }
  return db;
  };
  
  export { connectToServer, getDb };