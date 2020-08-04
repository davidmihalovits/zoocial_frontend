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
    faSpinner,
    faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

const AnotherUser = (props) => {
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        props.getAnotherUser({ id: props.match.params.id });
        props.getAnotherUserPosts({ id: props.match.params.id });
        window.scrollTo(0, 0);
    }, [props]);

    dayjs.extend(relativeTime);

    let anotherUserFollowers =
        user.anotherUser.followers &&
        user.anotherUser.followers.map((a) => a._id);

    return (
        <div className="another-user">
            {user.loading ? (
                <FontAwesomeIcon className="spinner" icon={faSpinner} spin />
            ) : (
                <div>
                    <div className="wide-profile-flex">
                        <div className="wide-profile-left">
                            <h1>{user.anotherUser.username}</h1>
                            {user.anotherUser.image ? (
                                <img
                                    src={user.anotherUser.image}
                                    alt="profile pic"
                                />
                            ) : (
                                <img src={noImg} alt="no profile pic" />
                            )}
                            <p className="bio">
                                {user.anotherUser.bio
                                    ? user.anotherUser.bio
                                    : "..."}
                            </p>
                        </div>
                        <div className="wide-profile-right">
                            <div className="user-details">
                                <p>{user.anotherUser.age}</p>
                                <p>{user.anotherUser.gender}</p>
                                <p>{user.anotherUser.location}</p>
                                <p>
                                    <a
                                        href={user.anotherUser.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {user.anotherUser.website}
                                    </a>
                                </p>
                                <p>
                                    Member for{" "}
                                    {dayjs(user.anotherUser.createdAt).fromNow(
                                        true
                                    )}
                                </p>
                            </div>
                            {user.anotherUser.followers &&
                                anotherUserFollowers.includes(
                                    user.user._id
                                ) && (
                                    <Button
                                        onClick={() =>
                                            props.follow({
                                                id: user.anotherUser._id,
                                                anotherUser: user.anotherUser,
                                                user: user.user,
                                            })
                                        }
                                        className="follow-true"
                                    >
                                        Following
                                    </Button>
                                )}
                            {user.anotherUser.followers &&
                                !anotherUserFollowers.includes(
                                    user.user._id
                                ) && (
                                    <Button
                                        onClick={() =>
                                            props.follow({
                                                id: user.anotherUser._id,
                                                anotherUser: user.anotherUser,
                                                user: user.user,
                                            })
                                        }
                                        className="follow-false"
                                    >
                                        Follow
                                    </Button>
                                )}
                        </div>
                    </div>
                    <div className="following-followers-flex">
                        <div className="following-followers">
                            <p>Following:</p>
                            <div>
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
                                            >
                                                {a.image ? (
                                                    <img src={a.image} alt="" />
                                                ) : (
                                                    <img src={noImg} alt="" />
                                                )}
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="following-followers">
                            <p>Followers:</p>
                            <div>
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
                                            >
                                                {a.image ? (
                                                    <img src={a.image} alt="" />
                                                ) : (
                                                    <img src={noImg} alt="" />
                                                )}
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="posts">
                        {user.posts
                            .map((a, key) => {
                                return (
                                    <div
                                        className="another-user-post"
                                        key={key}
                                    >
                                        <div className="post-by">
                                            {user.anotherUser.image ? (
                                                <img
                                                    src={user.anotherUser.image}
                                                    alt=""
                                                />
                                            ) : (
                                                <img src={noImg} alt="" />
                                            )}
                                            <div className="post-date">
                                                {user.anotherUser.username}
                                                <div
                                                    style={{
                                                        color: "#d1d1d1",
                                                        fontSize: "12px",
                                                        marginTop: "5px",
                                                    }}
                                                >
                                                    {dayjs(a.createdAt).fromNow(
                                                        true
                                                    )}{" "}
                                                    ago
                                                </div>
                                            </div>
                                        </div>
                                        <p className="post">{a.post}</p>
                                        <div className="post-bottom-buttons">
                                            <Button
                                                onClick={() =>
                                                    props.like(
                                                        {
                                                            id: a._id,
                                                        },
                                                        {
                                                            user: user.user,
                                                        },
                                                        {
                                                            post: a,
                                                        }
                                                    )
                                                }
                                                className={
                                                    a.likedBy.includes(
                                                        user.user._id
                                                    )
                                                        ? "liked"
                                                        : "like-button"
                                                }
                                            >
                                                {a.likes}
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    props.dislike(
                                                        {
                                                            id: a._id,
                                                        },
                                                        {
                                                            user: user.user,
                                                        },
                                                        {
                                                            post: a,
                                                        }
                                                    )
                                                }
                                                className={
                                                    a.dislikedBy.includes(
                                                        user.user._id
                                                    )
                                                        ? "disliked"
                                                        : "dislike-button"
                                                }
                                            >
                                                {a.dislikes}
                                                <FontAwesomeIcon
                                                    icon={faHeartBroken}
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                />
                                            </Button>
                                            <Link
                                                to={`/post/${a._id}`}
                                                className="comment-button"
                                            >
                                                <Button>
                                                    {a.commentCount}
                                                    <FontAwesomeIcon
                                                        icon={faCommentAlt}
                                                        style={{
                                                            marginLeft: "10px",
                                                        }}
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
            )}
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
