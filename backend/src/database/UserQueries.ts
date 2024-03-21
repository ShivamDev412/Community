import sql from ".";
import { QueryResultRow } from "pg";
import { Row, RowList } from "postgres";
const getUserById = async (id: string) => {
  const result =
    await sql`SELECT user_id, name, email, location, joined_on, image, bio, dob, sex, joined_on, looking_for, life_state FROM users WHERE user_id = ${id}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
const getUserPasswordById = async (
  userId: string
): Promise<QueryResultRow | null> => {
  const result =
    await sql`SELECT password FROM users WHERE user_id = ${userId}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
const getUserByEmail = async (
  email: string
): Promise<QueryResultRow | null> => {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
const getUserNameById = async (id: string) => {
  const result = await sql`SELECT name, image, user_id FROM users WHERE user_id = ${id}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
const addNewUser = async (
  name: string,
  email: string,
  password: string,
  imageUrl: string
) => {
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
const getUserGroupsQuery = async (
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
const getGroupById = async (groupId: string) => {
  const result = await sql`
    SELECT *
    FROM groups WHERE group_id = ${groupId}
  `;
  return result[0];
};
const getGroupNameAndLocationById = async (groupId: string) => {
  const result = await sql`
    SELECT name, location
    FROM groups WHERE group_id = ${groupId}
  `;
  return result[0];
};
const getGroupNameImageTypeAndLocationById = async (groupId: string) => {
  const result = await sql`
    SELECT name, image, group_type, location
    FROM groups WHERE group_id = ${groupId}
  `;
  return result[0];
};
const getGroupByName = async (name: string) => {
  const result = await sql`
    SELECT *
    FROM groups WHERE name = ${name}
  `;
  return result[0];
};
const addUserGroup = async (
  name: string,
  groupType: string,
  location: string,
  organizedBy: string,
  about: string,
  image: string
) => {
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
const getGroupsByOrganizedBy = async (organizedBy: string) => {
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
const getAllInterests = async () => {
  try {
    const result = await sql`
    SELECT * FROM interests ORDER BY LOWER(name);
    `;
    return result;
  } catch (error) {
    console.error("Error fetching all tags:", error);
    return [];
  }
};
const addEvent = async (
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
) => {
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
const getEventById = async (eventId: string) => {
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
const updateUserProfileById = async (
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
const updateUserProfileInfo = async (
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
const updateUserPassword = async (
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
const getAllCategoriesQuery = async () => {
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
const getAllInterestsQuery = async (categoryId: string) => {
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
const addUserInterest = async (userId: string, interestId: string) => {
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
const getUserInterests = async (userId: string) => {
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
};

const removeUserInterest = async (userId: string, interestId: string) => {
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
const getGroupsCreatedByUser = async (
  userId: string,
  offset: number
): Promise<any[]> => {
  const limit = 10;
  try {
    const result = await sql`
      SELECT * FROM groups WHERE organized_by = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
    return result;
  } catch (error) {
    console.error(`Error getting groups created by user ${userId}:`, error);
    throw error;
  }
};
const checkGroupExists = async (groupName: string) => {
  try {
    const result = await sql`
    SELECT *
    FROM groups
    WHERE name = ${groupName}
    `;

    return result;
  } catch (error) {
    console.error(`Error checking if group ${groupName} exists:`, error);
    throw error;
  }
};
const checkEventExists = async (eventName: string) => {
  try {
    const result = await sql`
    SELECT *
    FROM events
    WHERE name = ${eventName}
    `;

    return result;
  } catch (error) {
    console.error(`Error checking if event ${eventName} exists:`, error);
    throw error;
  }
};
const getMemberCountInGroup = async (groupId: string) => {
  try {
    const result = await sql`
          SELECT COUNT(*) AS member_count
          FROM user_groups
          WHERE group_id = ${groupId};
      `;
    return result[0]?.member_count || 0;
  } catch (error) {
    console.error(`Error getting member count in group ${groupId}:`, error);
    throw error;
  }
};
const getMembersDetail = async (groupId: string) => {
  try {
    const result = await sql`
    SELECT u.user_id, u.name, u.email, u.image
    FROM user_groups ug
    JOIN users u ON ug.user_id = u.user_id
    WHERE ug.group_id = ${groupId};
      `;
    return result;
  } catch (error) {
    console.error(`Error getting members detail in group ${groupId}:`, error);
    throw error;
  }
};
const getEventsCreatedByUser = async (userId: string, offset: number) => {
  const limit = 10;
  try {
    const result = await sql`
      SELECT * FROM events WHERE host_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
    return result;
  } catch (error) {
    throw error;
  }
};
const getEventsRSVPByUser = async (
  userId: string,
  offset: number
): Promise<QueryResultRow[]> => {
  try {
    const limit = 10;
    const result: QueryResultRow[] = await sql`
      SELECT e.*
      FROM events e
      JOIN user_events ue ON e.event_id = ue.event_id
      WHERE ue.user_id = ${userId}
      LIMIT ${limit} OFFSET ${offset};
    `;
    return result;
  } catch (error) {
    throw error;
  }
};
const getPastEventsAttendedByUser = async (userId: string, offset: number) => {
  const limit = 10;
  try {
    const result: QueryResultRow[] = await sql`
      SELECT e.*
      FROM events e
      JOIN user_events ue ON e.event_id = ue.event_id
      WHERE ue.user_id = ${userId}
        AND e.event_date < CURRENT_DATE
      LIMIT ${limit} OFFSET ${offset};
    `;
    return result;
  } catch (error) {
    throw error;
  }
};

const getEventMembersCountById = async (eventId: string) => {
  try {
    const result = await sql`
      SELECT COUNT(ue.user_id) AS num_attendees
      FROM events e
      LEFT JOIN user_events ue ON e.event_id = ue.event_id
      WHERE e.event_id = ${eventId}
      GROUP BY e.event_id;
    `;
    return Number(result[0].num_attendees);
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};
const addUserToEvent = async (userId: string, eventId: string) => {
  try {
    const result = await sql`
      INSERT INTO user_events (user_id, event_id)
      VALUES (${userId}, ${eventId})
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error("Error adding user to event:", error);
    throw error;
  }
};
const getEventDetailsById = async (eventId: string) => {
  try {
    const result = await sql`SELECT * FROM events WHERE event_id = ${eventId}`;
    return result[0];
  } catch (error: any) {
    throw error;
  }
};
const getEventMembers = async (eventId: string) => {
  try {
    const result = await sql`
      SELECT u.user_id, u.name, u.email, u.image
      FROM users u
      JOIN user_events ue ON u.user_id = ue.user_id
      WHERE ue.event_id = ${eventId};
    `;
    console.log(result,'result');
    return result;
  } catch (error) {
    throw error;
  }
};


export {
  // * GET QUERIES //
  getUserById,
  getUserPasswordById,
  getUserByEmail,
  getUserNameById,
  getMembersDetail,
  getMemberCountInGroup,
  getGroupsCreatedByUser,
  getUserGroupsQuery,
  getUserInterests,
  addUserInterest,
  getAllInterestsQuery,
  getAllCategoriesQuery,
  getGroupByName,
  getGroupsByOrganizedBy,
  getAllInterests,
  checkGroupExists,
  checkEventExists,
  getEventsCreatedByUser,
  getEventsRSVPByUser,
  getPastEventsAttendedByUser,
  getGroupById,
  getGroupNameAndLocationById,
  getEventMembersCountById,
  getEventDetailsById,
  getEventMembers,
  getGroupNameImageTypeAndLocationById,
  //* ADD QUERIES //
  addNewUser,
  addEvent,
  addUserToEvent,

  // * UPDATE QUERIES //
  updateUserPassword,
  updateUserProfileById,
  addUserGroup,
  updateUserProfileInfo,

  //* DELETE QUERIES //
  removeUserInterest,
};
