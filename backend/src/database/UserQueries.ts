import sql from ".";
import { QueryResultRow } from "pg";
import { Row, RowList } from "postgres";
const getUserById = async (id: string) => {
  const result =
    await sql`SELECT user_id, name, email, location, joined_on, image, compressed_image, bio, dob, sex, joined_on, looking_for, life_state FROM users WHERE user_id = ${id}`;
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
const getUserByGoogleId = async (googleId: string) => {
  try {
    const result = await sql`SELECT * FROM users WHERE google_id = ${googleId}`;
    if (result && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const addUserWithGoogleId = async (
  name: string,
  email: string,
  image: string,
  googleId: string
) => {
  try {
    const newUser: QueryResultRow | null = await sql`
    INSERT INTO users (name, email, image, google_id)
    VALUES (${name}, ${email}, ${image}, ${googleId})
    RETURNING *; 
  `;
    if (!newUser || Object.keys(newUser).length === 0) {
      return null;
    }
    return newUser;
  } catch (error) {
    throw error;
  }
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

const storeToken = async (userId: string, token: string, expiry: Date) => {
  try {
    const result = await sql`
      INSERT INTO password_reset_tokens (user_id, token, token_expiry)
      VALUES (${userId}, ${token}, ${expiry})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getToken = async (userId: string) => {
  try {
    const result = await sql`
      SELECT * FROM password_reset_tokens WHERE user_id = ${userId}
    `;
    
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserNameById = async (id: string) => {
  const result =
    await sql`SELECT name, image, compressed_image, user_id FROM users WHERE user_id = ${id}`;
  if (result && result.length > 0) {
    return result[0];
  }
  return null;
};
const addNewUser = async (
  name: string,
  email: string,
  password: string,
  imageUrl: string,
  compressedImageUrl: string
) => {
  const newUser: QueryResultRow = await sql`
      INSERT INTO users (name, email, password, image, compressed_image) 
      VALUES (${name}, ${email}, ${password}, ${imageUrl}, ${compressedImageUrl})
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
    SELECT name, location, group_id
    FROM groups WHERE group_id = ${groupId}
  `;
  return result[0];
};
const getGroupNameImageTypeAndLocationById = async (groupId: string) => {
  const result = await sql`
    SELECT name, image, compressed_image, group_type, location
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
  image: string,
  compressedImage: string,
  latitude: number,
  longitude: number
) => {
  try {
    const result = await sql`
      INSERT INTO groups (name, group_type, location, organized_by, about, image, compressed_image, latitude, longitude)
      VALUES (${name}, ${groupType}, ${location}, ${organizedBy}, ${about}, ${image}, ${compressedImage} , ${latitude}, ${longitude})
      RETURNING group_id;
    `;
    const newGroup = await getGroupById(result[0].group_id);
    return newGroup;
  } catch (error) {

  throw error;
  }
};
const updateUserGroupQuery = async (
  groupId: string,
  name: string,
  groupType: string,
  location: string,
  about: string,
  image: string,
  compressedImage: string,
  latitude: number,
  longitude: number
) => {
  try {
    const result = await sql`
      UPDATE groups
      SET
        name = ${name},
        group_type = ${groupType},
        location = ${location},
        about = ${about},
        image = ${image},
        compressed_image = ${compressedImage},
        latitude = ${latitude},
        longitude = ${longitude},
        updated_at = CURRENT_TIMESTAMP
      WHERE
        group_id = ${groupId}
      RETURNING group_id;
    `;
    const updatedGroup = await getGroupById(result[0].group_id);

    return updatedGroup;
  } catch (error) {
    throw error;
  
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
    throw error;
  }
};
const getAllInterests = async () => {
  try {
    const result = await sql`
    SELECT * FROM interests ORDER BY LOWER(name);
    `;
    return result;
  } catch (error) {
    throw error;
  }
};
const addEvent = async (
  name: string,
  image: string,
  compressedImage: string,
  details: string,
  hostId: string,
  groupId: string,
  eventDate: string,
  eventTime: string,
  event_end_time: string,
  eventType: string,
  link: string,
  address: string,
  tags: string[],
  latitude: number,
  longitude: number,
) => {
  latitude;
  longitude;
  try {
    const result = await sql`
      INSERT INTO events (name, image, compressed_image, details, host_id, group_id, event_date, event_time, event_end_time, event_type, link, address, tags, latitude, longitude)
      VALUES (${name}, ${image}, ${compressedImage}, ${details}, ${hostId}, ${groupId}, ${eventDate}, ${eventTime}, ${event_end_time}, ${eventType}, ${link}, ${address}, ${tags}, ${latitude}, ${longitude})
      RETURNING event_id;
    `;
    const newEvent = await getEventById(result[0].event_id);
    return newEvent;
  } catch (error) {
    throw error;
  }
};
const updateEventQuery = async (
  eventId: string,
  name: string,
  image: string,
  compressedImage: string,
  details: string,
  hostId: string,
  groupId: string,
  eventDate: string,
  eventTime: string,
  event_end_time: string,
  eventType: string,
  link: string,
  address: string,
  tags: string[],
  latitude: number,
  longitude: number
) => {
  try {
    const result = await sql`
      UPDATE events
      SET 
        name = ${name},
        image = ${image},
        compressed_image = ${compressedImage},
        details = ${details},
        host_id = ${hostId},
        group_id = ${groupId},
        event_date = ${eventDate},
        event_time = ${eventTime},
        event_end_time = ${event_end_time},
        event_type = ${eventType},
        link = ${link},
        address = ${address},
        tags = ${tags},
        latitude = ${latitude},
        longitude = ${longitude}
      WHERE event_id = ${eventId}
      RETURNING event_id;
    `;
    const updatedEvent = await getEventById(result[0].event_id);
    return updatedEvent;
  } catch (error) {
    throw error;
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
    throw error
  }
};
const updateUserProfileById = async (
  userId: string,
  name: string,
  image: string,
  compressedImage: string,
  bio: string,
  location: string
): Promise<void> => {
  try {
    await sql`
      UPDATE users
      SET name = ${name},
          image = ${image},
          compressed_image = ${compressedImage},
          bio = ${bio},
          location = ${location},
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
    `;
  } catch (error) {
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
   throw error
  }
};
const updateUserPassword = async (
  userId: string,
  password: string
): Promise<void> => {
  
  try {
    await sql`
      UPDATE users
      SET password = ${password},
      updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId};
      
    `;
  } catch (error) {
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
    throw error
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
    throw error;
  }
};
const getMembersDetail = async (groupId: string) => {
  try {
    const result = await sql`
    SELECT u.user_id, u.name, u.email, u.image, u.compressed_image
    FROM user_groups ug
    JOIN users u ON ug.user_id = u.user_id
    WHERE ug.group_id = ${groupId};
      `;
    return result;
  } catch (error) {
   throw error
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
      SELECT u.user_id, u.name, u.email, u.image, u.compressed_image
      FROM users u
      JOIN user_events ue ON u.user_id = ue.user_id
      WHERE ue.event_id = ${eventId};
    `;
    return result;
  } catch (error) {
    throw error;
  }
};
const getAllEventsByGroupId = async (groupId: any) => {
  try {
    const result = await sql`
  SELECT * FROM events WHERE group_id = ${groupId}
  `;
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
  getAllEventsByGroupId,
  getToken,
  //* ADD QUERIES //
  addNewUser,
  addEvent,
  addUserToEvent,

  // * UPDATE QUERIES //
  updateUserPassword,
  updateUserProfileById,
  addUserGroup,
  updateUserProfileInfo,
  updateUserGroupQuery,
  updateEventQuery,
  storeToken,

  //* DELETE QUERIES //
  removeUserInterest, addUserWithGoogleId, getUserByGoogleId,
};
