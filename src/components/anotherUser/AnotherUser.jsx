import React, { useEffect } from "react";
import "./AnotherUser.sass";
import {
    getAnotherUser,
    like,
    dislike,
    getAnotherUserPosts,
    follow,
} from "../../redux/actions/actions";
import { withRouter, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import noImg from "../../assets/noImg.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faHeartBroken,
    faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

const AnotherUser = (props) => {
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        props.getAnotherUser({ id: props.match.params.id });
        props.getAnotherUserPosts({ id: props.match.params.id });
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    const linkToAnotherUser = (a) => {
        props.getAnotherUser({
            id: a._id,
        });
        props.getAnotherUserPosts({ id: a._id });
    };

    dayjs.extend(relativeTime);

    let anotherUserFollowers =
        user.anotherUser.followers &&
        user.anotherUser.followers.map((a) => a._id);

    if (user.anotherUser.status === "Invalid user.") {
        return (
            <p
                style={{
                    margin: "90px auto",
                    textAlign: "center",
                }}
            >
                User not found.
            </p>
        );
    }

    return (
        <div className="another-user">
            <div className="another-user-wide-box">
                <div className="another-user-wide-left">
                    <h1 className="another-user-title">
                        {user.anotherUser.username}
                    </h1>
                    {user.anotherUser.image ? (
                        <img
                            src={user.anotherUser.image}
                            alt="profile pic"
                            className="another-user-image"
                        />
                    ) : (
                        <img
                            className="another-user-image"
                            src={noImg}
                            alt="no profile pic"
                        />
                    )}
                    <p className="bio">
                        {user.anotherUser.bio ? user.anotherUser.bio : "..."}
                    </p>
                </div>
                <div className="another-user-wide-right">
                    <div className="user-details">
                        <p>{user.anotherUser.age}</p>
                        <p>{user.anotherUser.gender}</p>
                        <p>{user.anotherUser.location}</p>
                        <p>
                            <a
                                href={user.anotherUser.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="website-link"
                            >
                                {user.anotherUser.website}
                            </a>
                        </p>
                        <p>
                            Member for{" "}
                            {dayjs(user.anotherUser.createdAt).fromNow(true)}
                        </p>
                    </div>
                    {user.anotherUser.followers &&
                        anotherUserFollowers.includes(user.user._id) && (
                            <Button
                                onClick={() =>
                                    props.follow({
                                        id: user.anotherUser._id,
                                        anotherUser: user.anotherUser,
                                        user: user.user,
                                    })
                                }
                                className="follow-true-button"
                            >
                                Following
                            </Button>
                        )}
                    {user.anotherUser.followers &&
                        !anotherUserFollowers.includes(user.user._id) && (
                            <Button
                                onClick={() =>
                                    props.follow({
                                        id: user.anotherUser._id,
                                        anotherUser: user.anotherUser,
                                        user: user.user,
                                    })
                                }
                                className="follow-false-button"
                            >
                                Follow
                            </Button>
                        )}
                </div>
            </div>
            <div className="following-followers-box">
                <div className="following-followers">
                    <h2 className="following-title">Following:</h2>
                    <div className="following-followers-container">
                        {user.anotherUser.following &&
                            user.anotherUser.following.map((a, key) => {
                                return (
                                    <Link
                                        to={
                                            a._id === user.user._id
                                                ? `/profile`
                                                : `/user/${a._id}`
                                        }
                                        key={key}
                                        className="following-followers-link"
                                        onClick={() => linkToAnotherUser(a)}
                                    >
                                        {a.image ? (
                                            <img
                                                className="following-followers-image"
                                                src={a.image}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="following-followers-image"
                                                src={noImg}
                                                alt=""
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
                <div className="following-followers">
                    <h2 className="following-title">Followers:</h2>
                    <div className="following-followers-container">
                        {user.anotherUser.followers &&
                            user.anotherUser.followers.map((a, key) => {
                                return (
                                    <Link
                                        to={
                                            a._id === user.user._id
                                                ? `/profile`
                                                : `/user/${a._id}`
                                        }
                                        key={key}
                                        className="following-followers-link"
                                        onClick={() => linkToAnotherUser(a)}
                                    >
                                        {a.image ? (
                                            <img
                                                className="following-followers-image"
                                                src={a.image}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="following-followers-image"
                                                src={noImg}
                                                alt=""
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="posts-container">
                {user.anotherUserPosts
                    .map((a, key) => {
                        return (
                            <div className="posts" key={key}>
                                <div className="post-box">
                                    {user.anotherUser.image ? (
                                        <img
                                            src={user.anotherUser.image}
                                            alt=""
                                            className="post-user-image"
                                        />
                                    ) : (
                                        <img
                                            className="post-user-image"
                                            src={noImg}
                                            alt=""
                                        />
                                    )}
                                    <div className="post-user-date">
                                        <p className="post-user">
                                            {user.anotherUser.username}
                                        </p>
                                        <p className="post-date">
                                            {dayjs(a.createdAt).fromNow(true)}{" "}
                                            ago
                                        </p>
                                    </div>
                                </div>
                                <p className="user-post">{a.post}</p>
                                <div className="post-bottom-buttons">
                                    <Button
                                        onClick={() =>
                                            props.like({
                                                id: a._id,
                                                anotherUser: a,
                                                user: user.user,
                                            })
                                        }
                                        className={
                                            a.likedBy.includes(user.user._id)
                                                ? "liked"
                                                : "like-button"
                                        }
                                    >
                                        {a.likes}
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className="heart-icon"
                                        />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            props.dislike({
                                                id: a._id,
                                                anotherUser: a,
                                                user: user.user,
                                            })
                                        }
                                        className={
                                            a.dislikedBy.includes(user.user._id)
                                                ? "disliked"
                                                : "dislike-button"
                                        }
                                    >
                                        {a.dislikes}
                                        <FontAwesomeIcon
                                            icon={faHeartBroken}
                                            className="heart-icon"
                                        />
                                    </Button>
                                    <Link
                                        to={`/post/${a._id}`}
                                        className="comment-button-link"
                                    >
                                        <Button className="comment-button">
                                            {a.commentCount}
                                            <FontAwesomeIcon
                                                icon={faCommentAlt}
                                                className="comment-icon"
                                            />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                    .reverse()}
            </div>
        </div>
    );
};

export default connect(null, {
    getAnotherUser,
    like,
    dislike,
    getAnotherUserPosts,
    follow,
})(withRouter(AnotherUser));
