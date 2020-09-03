import React, { useEffect } from "react";
import "./Feed.sass";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { feed, like, dislike } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faHeartBroken,
    faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/noImg.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Feed = (props) => {
    dayjs.extend(relativeTime);

    useEffect(() => {
        props.feed();
        // eslint-disable-next-line
    }, []);

    const user = useSelector((state) => state.userReducer);

    return (
        <div className="feed-container">
            {user.posts &&
                user.posts
                    .map((a, key) => {
                        return (
                            <div className="feed" key={key}>
                                <div className="feed-box">
                                    <Link
                                        to={
                                            a.by && a.by._id === user.user._id
                                                ? `/profile`
                                                : `/user/${a.by && a.by._id}`
                                        }
                                        className="feed-user-link"
                                    >
                                        {a.by.image ? (
                                            <img
                                                className="feed-user-image"
                                                src={a.by.image}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="feed-user-image"
                                                src={noImg}
                                                alt=""
                                            />
                                        )}
                                    </Link>
                                    <div className="feed-user-date">
                                        <p className="feed-username">
                                            {a.by.username}
                                        </p>
                                        <p className="feed-date">
                                            {dayjs(a.createdAt).fromNow(true)}{" "}
                                            ago
                                        </p>
                                    </div>
                                </div>
                                <p className="feed-post">{a.post}</p>
                                <div className="feed-buttons">
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

            {user.posts.length === 0 && (
                <p
                    style={{
                        textAlign: "center",
                        margin: "90px auto",
                        padding: "0 16px",
                    }}
                >
                    Posts of people you're following should appear here.
                </p>
            )}
        </div>
    );
};

export default connect(null, { feed, like, dislike })(withRouter(Feed));
