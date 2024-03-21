export const ENDPOINTS = {
    HOME: "/home",
    LOGIN: "/login",
    SIGNUP: "/signup",
    USER: "/",
    GROUPS:"/groups",
    CREATE_GROUP: "/create-group",
    GROUPS_ORGANIZED_BY_USER: "/groups-organized-by-user",
    TAGS:"/tags",
    CREATE_EVENT:"/create-event",
    SEARCH:"/search",
    EDIT_PROFILE:"/edit-profile",
    UPDATE_PERSONAL_INFO:"/update-personal-info",
    CHANGE_PASSWORD:"/change-password",
    CATEGORIES:"/categories",
    INTERESTS:"/interests/:categoryId",
    ADD_INTERESTS:"/add-interests",
    DELETE_INTERESTS:"/delete-interests/:interestId",
    GET_USER_INTERESTS:"/get-user-interests",
    GET_USER_GROUPS_ORGANIZER:"/organizer",
    GET_USER_GROUPS_MEMBER:"/member",
    GROUP_DETAILS: "/details",
    USER_EVENTS:"/user-events",
    USER_EVENTS_DETAILS:"/event-details/:eventId"
};

export const API_ENDPOINTS = {
    USER: "/api/user",
    AUTH: "/api/auth",
    GROUP: "/api/group",
    EVENT: "/api/event",
    HOME: "/api/home",
};
