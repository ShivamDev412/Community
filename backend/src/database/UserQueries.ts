import sql from ".";
import { QueryResultRow } from "pg";

export const getUserById = async (
  id: string
): Promise<QueryResultRow | null> => {
  const result =
    await sql`SELECT user_id, name, email, location, age, joined_on, image, bio, dob, sex FROM users WHERE user_id = ${id}`;
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
export const getUserGroups = async (
  userId: string
): Promise<QueryResultRow[]> => {
  const result = await sql`
    SELECT g.*
    FROM groups g
    JOIN user_groups ug ON g.group_id = ug.group_id
    WHERE ug.user_id = ${userId}
  `;
  return result;
};
export const getGroupById = async (groupId: string) => {
  const result = await sql`
    SELECT *
    FROM groups WHERE group_id = ${groupId}
  `;
  return result[0];
};
export const addUserGroup = async (
  name: string,
  groupType: string,
  location: string,
  organizedBy: string,
  about: string,
  image: string
): Promise<QueryResultRow | null> => {
  try {
    const result = await sql`
      INSERT INTO groups (name, group_type, location, organized_by, about, image)
      VALUES (${name}, ${groupType}, ${location}, ${organizedBy}, ${about}, ${image})
      RETURNING group_id;
    `;
    const newGroup = await getGroupById(result[0].group_id);
    return newGroup
  } catch (error) {
    console.error("Error adding user group:", error);
    return null;
  }
};
