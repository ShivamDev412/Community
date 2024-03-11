import sql from ".";
import { QueryResultRow } from "pg";

export const getUserById = async (
  id: string
): Promise<QueryResultRow | null> => {
  const result =
    await sql`SELECT user_id, name, email, location, joined_on, image, bio, dob, sex, joined_on, looking_for, life_state FROM users WHERE user_id = ${id}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
export const getUserPasswordById = async (
  userId: string
): Promise<QueryResultRow | null> => {
  const result =
    await sql`SELECT password FROM users WHERE user_id = ${userId}`;
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
  password: string,
  imageUrl: string
): Promise<QueryResultRow | null> => {
  const newUser: QueryResultRow = await sql`
      INSERT INTO users (name, email, password, image) 
      VALUES (${name}, ${email}, ${password}, ${imageUrl})
      RETURNING user_id, email;
    `;
  if (newUser.length === 0) {
    return null;
  }
  return newUser[0];
};
export const getUserGroupsQuery = async (
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
    return newGroup;
  } catch (error) {
    console.error("Error adding user group:", error);
    return null;
  }
};
export const getGroupsByOrganizedBy = async (
  organizedBy: string
): Promise<QueryResultRow[]> => {
  try {
    const result = await sql`
      SELECT * 
      FROM groups 
      WHERE organized_by = ${organizedBy};
    `;
    return result;
  } catch (error) {
    console.error("Error fetching groups by organized_by:", error);
    return [];
  }
};
export const getAllTags = async () => {
  try {
    const result = await sql`
      SELECT * FROM tags;
    `;
    return result;
  } catch (error) {
    console.error("Error fetching all tags:", error);
    return [];
  }
};
export const addEvent = async (
  name: string,
  image: string,
  details: string,
  hostId: string,
  groupId: string,
  eventDate: string,
  eventTime: string,
  eventType: string,
  link: string,
  address: string,
  tags: string[]
): Promise<QueryResultRow | null> => {
  try {
    const result = await sql`
      INSERT INTO events (name, image, details, host_id, group_id, event_date, event_time, event_type, link, address, tags)
      VALUES (${name}, ${image}, ${details}, ${hostId}, ${groupId}, ${eventDate}, ${eventTime}, ${eventType}, ${link}, ${address}, ${tags})
      RETURNING event_id;
    `;
    const newEvent = await getEventById(result[0].event_id);
    return newEvent;
  } catch (error) {
    console.error("Error adding event:", error);
    return null;
  }
};
export const getEventById = async (
  eventId: string
): Promise<QueryResultRow | null> => {
  try {
    const result = await sql`
      SELECT *
      FROM events
      WHERE event_id = ${eventId};
    `;
    return result[0];
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
};
export const updateUserProfileById = async (
  userId: string,
  name: string,
  image: string,
  bio: string,
  location: string
): Promise<void> => {
  try {
    await sql`
      UPDATE users
      SET name = ${name},
          image = ${image},
          bio = ${bio},
          location = ${location},
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
    `;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
export const updateUserProfileInfo = async (
  userId: string,
  dob: Date | any,
  sex: string | any,
  lookingFor: string[] | any,
  lifeState: string[] | any
): Promise<void> => {
  try {
    await sql`
      UPDATE users
      SET dob = ${dob},
          sex = ${sex},
          looking_for = ${lookingFor},
          life_state = ${lifeState},
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
    `;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
export const updateUserPassword = async (
  userId: string,
  password: string
): Promise<void> => {
  console.log(userId, password);
  try {
    await sql`
      UPDATE users
      SET password = ${password},
      updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
      
    `;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
};
export const getAllCategoriesQuery = async (): Promise<any[]> => {
  try {
    const result = await sql`
      SELECT * FROM categories;
    `;
    return result;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};
export const getAllInterestsQuery = async (
  categoryId: string
): Promise<any[]> => {
  try {
    const result = await sql`
      SELECT * FROM interests WHERE category_id = ${categoryId};
    `;
    return result;
  } catch (error) {
    console.error("Error fetching all interests:", error);
    throw error;
  }
};
export const addUserInterest = async (
  userId: string,
  interestId: string
): Promise<void> => {
  try {
    await sql`
      INSERT INTO user_interests (user_id, interest_id)
      VALUES (${userId}, ${interestId});
    `;
  } catch (error) {
    console.error("Error adding user interest:", error);
    throw error;
  }
};
export const getUserInterests = async (userId: string): Promise<any[]> => {
  try {
    const result = await sql`
      SELECT interests.interest_id, interests.name
      FROM interests
      JOIN user_interests ON interests.interest_id = user_interests.interest_id
      WHERE user_interests.user_id = ${userId};
    `;
    return result;
  } catch (error) {
    console.error("Error getting user interests:", error);
    throw error;
  }
}

export const removeUserInterest = async (userId: string, interestId: string): Promise<void> => {
  try {
    await sql`
      DELETE FROM user_interests
      WHERE user_id = ${userId} AND interest_id = ${interestId};
    `;
  } catch (error) {
    console.error("Error removing user interest:", error);
    throw error;
  }
};