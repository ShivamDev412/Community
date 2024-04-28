export const ENDPOINTS = {
    HOME: "/home",
    LOGIN: "/login",
    LOGOUT:  "/logout/",
    REFRESH_TOKEN: "/refresh-token",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    USER: "/",
    
    GOOGLE_LOGIN: "/login/google",
    GOOGLE_CALLBACK: "/google/callback",

    GITHUB_LOGIN: "/login/github",
    GITHUB_CALLBACK: "/github/callback",

    FACEBOOK_LOGIN: "/login/facebook",
    FACEBOOK_CALLBACK: "/facebook/callback",


    GROUPS:"/groups",
    CREATE_GROUP: "/create-group",
    UPDATE_GROUP: "/update-group/:groupId",
    GROUPS_ORGANIZED_BY_USER: "/groups-organized-by-user",
    GET_USER_GROUPS_ORGANIZER:"/organizer",
    GET_USER_GROUPS_MEMBER:"/member",
    GROUP_DETAILS: "/details",
    GET_EVENTS_IN_GROUP:"/events-in-group",

    TAGS:"/tags",
    CREATE_EVENT:"/create-event",
    UPDATE_EVENT:"/update-event/:eventId",
    USER_EVENTS:"/user-events",
    EVENTS_DETAILS:"/event-details/:eventId",

    SEARCH:"/search",
    GET_CITY:"/get-city",

    EDIT_PROFILE:"/edit-profile",
    UPDATE_PERSONAL_INFO:"/update-personal-info",
    CHANGE_PASSWORD:"/change-password",
    CATEGORIES:"/categories",
    INTERESTS:"/interests/:categoryId",
    ADD_INTERESTS:"/add-interests",
    DELETE_INTERESTS:"/delete-interests/:interestId",
    GET_USER_INTERESTS:"/get-user-interests",
    
};

export const API_ENDPOINTS = {
    USER: "/api/user",
    AUTH: "/api/auth",
    GROUP: "/api/group",
    EVENT: "/api/event",
    HOME: "/api/home",
};
