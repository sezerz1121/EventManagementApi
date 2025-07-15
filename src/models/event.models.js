// for creating table

export const createEventTable = async (pool) => {
  const query = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      datetime TIMESTAMPTZ NOT NULL,
      location TEXT NOT NULL,
      capacity INTEGER NOT NULL CHECK (capacity <= 1000),
      registrations INTEGER[] DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

// for inserting event
export const insertEvent = async (pool, { title, datetime, location, capacity }) => {
  const query = `
    INSERT INTO events (title, datetime, location, capacity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [title, datetime, location, capacity];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllEvents = async (pool) => {
  const query = `SELECT * FROM events ORDER BY datetime ASC ;`;
  const result = await pool.query(query);
  return result.rows;
};

export const getUpcomingEvents = async (pool) => {
  const query = `
    SELECT * FROM events
    WHERE datetime > NOW()
    ORDER BY datetime ASC, location ASC;
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const getCapacity = async (pool,{id}) => {
  const query = `
    SELECT capacity FROM events
    WHERE id =$1;
  `;
  const result = await pool.query(query,[id]);
  return result.rows[0];
};

export const getRegistrations = async (pool,{id}) => {
  const query = `
    SELECT registrations FROM events
    WHERE id =$1;
  `;
  const result = await pool.query(query,[id]);
  return result.rows;
};




export const getSingleEvent = async (pool, { eventId }) => {
  const query = `SELECT * FROM events WHERE id = $1`;
  const result = await pool.query(query, [eventId]);
  return result.rows[0];
};

export const getSingleEventRegisters = async (pool, { eventId }) => {
  const query = `SELECT registrations FROM events WHERE id = $1`;
  const result = await pool.query(query, [eventId]);
  return result.rows[0];
};

export const registerUserForEvent = async (pool, { eventId, userId }) => {
  const query = `
    UPDATE events
    SET
      registrations = registrations || ARRAY[$2]::int[],
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $1
      AND NOT ($2 = ANY(registrations))
      AND COALESCE(array_length(registrations, 1), 0) < capacity
      AND datetime > NOW()
    RETURNING *;
  `;
  const result = await pool.query(query, [eventId, userId]);
  return result.rows[0];
};

export const cancelRegistration = async (pool, { eventId, userId }) => {
  const query = `
    UPDATE events
    SET
      registrations = array_remove(registrations, $2),
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = $1
      AND $2 = ANY(registrations)
    RETURNING *;
  `;

  const result = await pool.query(query, [eventId, userId]);

  if (result.rows.length === 0) {
    throw new Error("Cancellation failed: user not registered or event not found.");
  }

  return result.rows[0];
};


