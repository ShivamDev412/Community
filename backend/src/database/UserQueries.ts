import sql from ".";
import { QueryResultRow } from "pg";

export const getUserById = async (
  id: string
): Promise<QueryResultRow | null> => {
  const result = await sql`SELECT * FROM users WHERE user_id = ${id}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
export const getUserByEmail = async (
  email: string
): Promise<QueryResultRow | null> => {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
export const addNewUser = async (
  name: string,
  email: string,
  password: string
): Promise<QueryResultRow | null> => {
  const newUser: QueryResultRow = await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${password})
      RETURNING user_id, email;
    `;
  if (newUser.length === 0) {
    return null;
  }
  return newUser[0];
};
