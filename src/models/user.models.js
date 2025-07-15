export const createUserTable = async (pool) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};


export const insertUser = async (pool, { name, email, }) => {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [name, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getSingleUser = async (pool, { userId }) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
}