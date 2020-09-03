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
    POST_POST_REQUEST,
    DELETE_POST,
    UPDATE_PROFILE,
    USERS,
    //GET_ANOTHER_USER_REQUEST,
    GET_ANOTHER_USER,
    GET_MY_POSTS,
    GET_ANOTHER_USER_POSTS,
    FOLLOW,
    GET_FEED,
    //GET_FEED_REQUEST,
    GET_ANOTHER_POST,
    //GET_ANOTHER_POST_REQUEST,
    //GET_MY_POSTS_REQUEST,
    //GET_COMMENTS_REQUEST,
    GET_COMMENTS,
    COMMENT,
    SEARCH,
    SEARCH_ERROR,
    //SEARCH_REQUEST,
    GET_NOTIFICATIONS,
    READ_NOTIFICATIONS,
} from "./types";
import axios from "axios";

export const profile = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
        dispatch({
            type: NO_PROFILE,
        });
    }

    if (token) {
        axios
            .get("https://zoocial-backend.herokuapp.com/profile", {
                headers: { "X-Auth-Token": token },
            })
            .then((res) =>
                dispatch({
                    type: PROFILE,
                    payload: res.data,
                })
            );
    }
};

export const login = (login) => (dispatch) => {
    dispatch({
        type: LOGIN_REQUEST,
    });

    axios
        .post("https://zoocial-backend.herokuapp.com/login", login)
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
                dispatch(getNotifications());
            } else if (res.data.status === "Invalid credentials.") {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: res.data.status,
                });
            }
        });
};

export const signup = (signup) => (dispatch) => {
    dispatch({
        type: SIGNUP_REQUEST,
    });

    axios
        .post("https://zoocial-backend.herokuapp.com/signup", signup)
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: res.data,
                });
            } else if (
                res.data.status === "Enter your username, max 12 characters."
            ) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            } else if (res.data.status === "Invalid email.") {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            } else if (
                res.data.status === "Password must be at least 6 characters."
            ) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            } else if (res.data.status === "This email is already taken.") {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            } else if (res.data.status === "This username is already taken.") {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: res.data.status,
                });
            }
        });
};

export const logout = (history) => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
};

export const like = (id) => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .put(
                `https://zoocial-backend.herokuapp.com/likePost/${id.id}`,
                id,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) => {
                dispatch({
                    type: LIKE,
                    payload: res.data,
                });
            })
            .then(() => {
                const socket = require("socket.io-client")(
                    "https://zoocial-backend.herokuapp.com"
                );
                socket.emit("like", id);
            });
    }
};

export const dislike = (id) => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .put(
                `https://zoocial-backend.herokuapp.com/dislikePost/${id.id}`,
                id,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) => {
                dispatch({
                    type: DISLIKE,
                    payload: res.data,
                });
            })
            .then(() => {
                const socket = require("socket.io-client")(
                    "https://zoocial-backend.herokuapp.com"
                );
                socket.emit("dislike", id);
            });
    }
};

export const postPost = (post, history) => (dispatch) => {
    dispatch({
        type: POST_POST_REQUEST,
    });

    const token = localStorage.getItem("token");
    if (token) {
        axios
            .post("https://zoocial-backend.herokuapp.com/postPost", post, {
                headers: { "X-Auth-Token": token },
            })
            .then((res) => {
                dispatch({
                    type: POST_POST,
                    payload: res.data,
                });
                history.push("/feed");
            });
    }
};

export const deletePost = (id) => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .delete(
                `https://zoocial-backend.herokuapp.com/deletePost/${id.id}`,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) => {
                dispatch({
                    type: DELETE_POST,
                    payload: res.data,
                });
            });
    }
};

export const updateProfile = (updateProfile) => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .put(
                "https://zoocial-backend.herokuapp.com/updateProfile",
                updateProfile,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) => {
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data,
                });
            });
    }
};

export const users = () => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .get("https://zoocial-backend.herokuapp.com/users", {
                headers: { "X-Auth-Token": token },
            })
            .then((res) =>
                dispatch({
                    type: USERS,
                    payload: res.data,
                })
            );
    }
};

export const getAnotherUser = (id) => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get(
                `https://zoocial-backend.herokuapp.com/getAnotherUser/user/${id.id}`,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) =>
                dispatch({
                    type: GET_ANOTHER_USER,
                    payload: res.data,
                })
            );
    }
};

export const getMyPosts = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get("https://zoocial-backend.herokuapp.com/getMyPosts", {
                headers: { "X-Auth-Token": token },
            })
            .then((res) =>
                dispatch({
                    type: GET_MY_POSTS,
                    payload: res.data,
                })
            );
    }
};

export const getAnotherUserPosts = (id) => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get(
                `https://zoocial-backend.herokuapp.com/getAnotherUserPosts/${id.id}`,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) =>
                dispatch({
                    type: GET_ANOTHER_USER_POSTS,
                    payload: res.data,
                })
            );
    }
};

export const follow = (id) => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .put(`https://zoocial-backend.herokuapp.com/follow/${id.id}`, id, {
                headers: { "X-Auth-Token": token },
            })
            .then((res) =>
                dispatch({
                    type: FOLLOW,
                    payload: res.data,
                })
            )
            .then(() => {
                const socket = require("socket.io-client")(
                    "https://zoocial-backend.herokuapp.com"
                );
                socket.emit("follow", id);
            });
    }
};

export const feed = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get("https://zoocial-backend.herokuapp.com/feed", {
                headers: { "X-Auth-Token": token },
            })
            .then((res) =>
                dispatch({
                    type: GET_FEED,
                    payload: res.data,
                })
            );
    }
};

export const getAnotherPost = (id) => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get(
                `https://zoocial-backend.herokuapp.com/getAnotherPost/${id.id}`,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) =>
                dispatch({
                    type: GET_ANOTHER_POST,
                    payload: res.data,
                })
            );
    }
};

export const getComments = (id) => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get(`https://zoocial-backend.herokuapp.com/getComments/${id.id}`, {
                headers: { "X-Auth-Token": token },
            })
            .then((res) =>
                dispatch({
                    type: GET_COMMENTS,
                    payload: res.data,
                })
            );
    }
};

export const comment = (id, comment) => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .post(
                `https://zoocial-backend.herokuapp.com/comment/${id.id}`,
                comment,
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) => {
                dispatch({
                    type: COMMENT,
                    payload: res.data,
                });
            })
            .then(() => {
                const socket = require("socket.io-client")(
                    "https://zoocial-backend.herokuapp.com"
                );
                socket.emit("comment", id);
            });
    }
};

export const searchAll = (search, history) => (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
        axios
            .post("https://zoocial-backend.herokuapp.com/search", search, {
                headers: { "X-Auth-Token": token },
            })
            .then((res) => {
                if (res.data.status === "Enter some text.") {
                    dispatch({
                        type: SEARCH_ERROR,
                        payload: res.data.status,
                    });
                } else {
                    dispatch({
                        type: SEARCH,
                        payload: res.data,
                    });
                    history.push("/search");
                }
            });
    }
};

export const getNotifications = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .get("https://zoocial-backend.herokuapp.com/getNotifications", {
                headers: { "X-Auth-Token": token },
            })
            .then((res) =>
                dispatch({
                    type: GET_NOTIFICATIONS,
                    payload: res.data,
                })
            );
    }
};

export const readNotification = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
        axios
            .put(
                "https://zoocial-backend.herokuapp.com/readNotification",
                {},
                {
                    headers: { "X-Auth-Token": token },
                }
            )
            .then((res) =>
                dispatch({
                    type: READ_NOTIFICATIONS,
                    payload: res.data,
                })
            );
    }
};
