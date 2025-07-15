import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.PG_URL, 
      ssl: {
        rejectUnauthorized: false,
      },
    });

    
    console.log("PostgreSQL connected");
    
    return pool;
  } catch (error) {
    console.error(" PostgreSQL connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
