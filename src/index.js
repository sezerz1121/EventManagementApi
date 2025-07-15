import dotenv from "dotenv";
import { app } from "./app.js";
import getPool from "./db/pool.js";
import { createEventTable } from "./models/event.models.js";
import { createUserTable } from "./models/user.models.js";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  try {
    const pool = await getPool();
    await createEventTable(pool);
    await createUserTable(pool)

    app.listen(3000, () => {
      console.log("Server is running on port: 3000");
    });
  } catch (err) {
    console.error("PostgreSQL CONNECTION FAILED!!!", err);
    process.exit(1);
  }
};

startServer();
