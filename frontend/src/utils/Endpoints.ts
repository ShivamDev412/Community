export const RouteEndpoints = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOGOUT: "/logout",
  GOOGLE_SUCCESS_LOGIN: "/login/google/success",
  GOOGLE_FAILURE_LOGIN: "/login/google/failure",
  PROFILE: "/profile",
  EDIT_PROFILE: "/edit-profile",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",
  YOUR_GROUPS: "/your-groups",
  EDIT_GROUP: "/edit-group/:groupName",
  YOUR_EVENTS: "/your-events",
  NEW_EVENT: "/new-event",
  EDIT_EVENT: "/edit-event/:id",
  CREATE_EVENT: "/create-event",
  CREATE_GROUP: "/create-group",
  PROFILE_INFO: "/personal-info",
  ACCOUNT_MANAGEMENT: "/account-management",
  CHANGE_PASSWORD: "/account-management/change-password",
  INTERESTS: "/interests",
  GROUP_DETAILS: "/group/:name/",
  GROUP_DETAILS_MEMBERS:"/group/:name/members",
  GROUP_DETAILS_EVENTS:"/group/:name/events",
  EVENT_DETAILS:"/event/:eventId"
};
export const Endpoints = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOGOUT: "/logout",
  PROFILE: "/profile",
  REFRESH_TOKEN: "/refresh-token",
  
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",

  NOTIFICATIONS: "/notifications",

  SETTINGS: "/settings",
  
 
  TAGS: "/tags",

  GROUPS_ORGANIZED_BY_USER: "/groups-organized-by-user",
  YOUR_GROUPS: "/your-groups",
  CREATE_EVENT: "/create-event",
  CREATE_GROUP: "/create-group",
  UPDATE_GROUP: "/update-group",
  GET_USER_GROUPS_ORGANIZER:"/organizer",
  GET_USER_GROUPS_MEMBER:"/member",
  GROUP_DETAILS:"/details",
  GROUP_DETAILS_MEMBERS:"/details/members",
  GROUP_DETAILS_EVENTS:"/details/events",

  SEARCH: "/search",
  GET_CITY: "/get-city",
  GET_EVENTS: "/get-events",
  RSVP_EVENTS: "/rspv-events",

  EDIT_PROFILE: "/edit-profile",
  UPDATE_PERSONAL_INFO: "/update-personal-info",
  CHANGE_PASSWORD: "/change-password",
  CATEGORIES: "/categories",
  INTERESTS: "/interests",
  ADD_INTERESTS:"/add-interests",
  DELETE_INTERESTS:"/delete-interests",
  GET_USER_INTERESTS:"/get-user-interests",
  REGISTER_TO_EVENT:"/register-to-event",
  CANCEL_RSVP:"/cancel-rsvp",


  USER_EVENTS:"/user-events",
  EVENTS_DETAILS:"/event-details",
  GET_EVENTS_IN_GROUP:"/events-in-group",
  UPDATE_EVENT: "/update-event",
};
export const API_ENDPOINTS = {
  USER: "/api/user",
  AUTH: "/api/auth",
  GROUP: "/api/group",
  EVENT: "/api/event",
  HOME: "/api/home",
};
