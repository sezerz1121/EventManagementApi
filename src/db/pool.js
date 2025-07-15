import connectDB from "./index.js";

let pool;

const getPool = async () => {
  if (!pool) {
    pool = await connectDB();
  }
  return pool;
};

export default getPool;
