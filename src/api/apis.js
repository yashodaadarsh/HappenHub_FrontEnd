// Base URLs for different services
export const AUTH_BASE_URL = "http://localhost:8080";
export const SEARCH_BASE_URL = "http://localhost:8083";
export const RECOMMENDATION_BASE_URL = "http://localhost:8084";
export const WISHLIST_BASE_URL = "http://localhost:8086";

// authentication
export const SIGNUP = `${AUTH_BASE_URL}/auth-service/api/v1/signup`; // POST
export const LOGIN = `${AUTH_BASE_URL}/auth-service/api/v1/login`; // POST

// search service
export const GET_ALL_EVENTS = `${SEARCH_BASE_URL}/search-service/api/v1/events/all`; // GET
export const GET_EVENTS_PAGED = `${SEARCH_BASE_URL}/search-service/api/v1/events/paged`; // GET
export const GET_EVENTS_BY_TYPE = `${SEARCH_BASE_URL}/search-service/api/v1/events/type`; // GET
export const SEARCH_EVENTS = `${SEARCH_BASE_URL}/search-service/api/v1/events/search`; // GET
export const GET_EVENT_BY_ID = (id) => `${SEARCH_BASE_URL}/search-service/api/v1/events/${id}`; // GET

// recommendation service (for logged in users)
export const GET_PERSONALIZED_FEED = `${RECOMMENDATION_BASE_URL}/recommendation-service/api/v1/events/feed`; // GET

// auth service ping
export const PING_AUTH = `${AUTH_BASE_URL}/auth-service/api/v1/ping/`; // GET with token in path

// auth service profile
export const GET_PROFILE = `${AUTH_BASE_URL}/auth-service/api/v1/profile`; // GET
export const UPDATE_PROFILE = `${AUTH_BASE_URL}/auth-service/api/v1/profile`; // PATCH

// wishlist service
export const ADD_TO_WISHLIST = (eventId) => `${WISHLIST_BASE_URL}/wishlist-service/api/v1/wishlist/events/${eventId}`; // POST
export const REMOVE_FROM_WISHLIST = (id) => `${WISHLIST_BASE_URL}/wishlist-service/api/v1/wishlist/events/${id}`; // PATCH
export const GET_WISHLIST_EVENTS = `${WISHLIST_BASE_URL}/wishlist-service/api/v1/wishlist/events`; // GET
