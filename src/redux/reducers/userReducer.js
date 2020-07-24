import {
    PROFILE,
    NO_PROFILE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    LIKE,
    DISLIKE,
    POST_POST,
    DELETE_POST,
    UPDATE_PROFILE,
    USERS,
    GET_ANOTHER_USER_REQUEST,
    GET_ANOTHER_USER,
    GET_MY_POSTS,
    GET_ANOTHER_USER_POSTS,
    FOLLOW,
    GET_FEED,
    GET_FEED_REQUEST,
    GET_ANOTHER_POST,
    GET_ANOTHER_POST_REQUEST,
    GET_MY_POSTS_REQUEST,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS,
    COMMENT,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    user: {},
    authenticated: false,
    loading: false,
    error: null,
    users: [],
    anotherUser: {},
    posts: [],
    post: {},
    comments: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
            };
        case NO_PROFILE:
            return { ...state };
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                authenticated: true,
                token: localStorage.getItem("token"),
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                authenticated: true,
                token: localStorage.getItem("token"),
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                error: null,
                authenticated: false,
                loading: false,
                user: {},
                users: [],
                anotherUser: {},
                posts: [],
            };
        case USERS:
            return {
                ...state,
                users: action.payload,
                anotherUser: {},
            };
        case GET_ANOTHER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ANOTHER_USER:
            return {
                ...state,
                anotherUser: action.payload,
                users: [],
                loading: false,
            };
        case GET_MY_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_MY_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case GET_ANOTHER_USER_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case GET_FEED_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_FEED:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((p) => {
                    if (p._id === action.payload._id) {
                        return action.payload;
                    }
                    return p;
                }),
                post: action.payload,
            };
        case DISLIKE:
            return {
                ...state,
                posts: state.posts.map((p) => {
                    if (p._id === action.payload._id) {
                        return action.payload;
                    }
                    return p;
                }),
                post: action.payload,
            };
        case POST_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case DELETE_POST:
            return { ...state, posts: action.payload };
        case UPDATE_PROFILE:
            return { ...state, user: action.payload };
        case FOLLOW:
            return { ...state, anotherUser: action.payload };
        case GET_ANOTHER_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        case GET_ANOTHER_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                comments: [],
            };
        case GET_COMMENTS:
            return {
                ...state,
                loading: false,
                comments: action.payload,
            };
        case COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        default:
            return state;
    }
}
