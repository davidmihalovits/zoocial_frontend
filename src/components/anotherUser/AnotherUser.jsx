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
                <>
                    <h1>{user.anotherUser.username}</h1>
                    {user.anotherUser.image ? (
                        <img src={user.anotherUser.image} alt="profile pic" />
                    ) : (
                        <img src={noImg} alt="no profile pic" />
                    )}
                    <p className="bio">
                        {user.anotherUser.bio ? user.anotherUser.bio : "..."}
                    </p>
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
                            {dayjs(user.anotherUser.createdAt).fromNow(true)}
                        </p>
                    </div>

                    {user.anotherUser.followers &&
                        anotherUserFollowers.includes(user.user._id) && (
                            <Button
                                onClick={() =>
                                    props.follow({
                                        id: user.anotherUser._id,
                                    })
                                }
                                className="follow-true"
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
                                    })
                                }
                                className="follow-false"
                            >
                                Follow
                            </Button>
                        )}

                    <div className="following">
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
                    <div className="followers">
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
                    <hr />
                    <div className="posts">
                        {user.posts
                            .map((a, key) => {
                                return (
                                    <div className="post" key={key}>
                                        <div className="post-date">
                                            <p style={{ fontSize: "18px" }}>
                                                {a.post}
                                            </p>
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
                                        <div>
                                            <Button
                                                style={{
                                                    color: "#42a5f5",
                                                    fontSize: "20px",
                                                }}
                                                onClick={() =>
                                                    props.like({
                                                        id: a._id,
                                                    })
                                                }
                                                className={
                                                    a.likedBy.includes(
                                                        user.user._id
                                                    )
                                                        ? "liked"
                                                        : null
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
                                                style={{
                                                    color: "#FA5C98",
                                                    fontSize: "20px",
                                                }}
                                                onClick={() =>
                                                    props.dislike({
                                                        id: a._id,
                                                    })
                                                }
                                                className={
                                                    a.dislikedBy.includes(
                                                        user.user._id
                                                    )
                                                        ? "disliked"
                                                        : null
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
                                        </div>
                                    </div>
                                );
                            })
                            .reverse()}
                    </div>
                </>
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
