import React, { useEffect, useState } from "react";
import "./AnotherPost.sass";
import {
    getAnotherPost,
    like,
    dislike,
    getComments,
    comment,
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

const AnotherPost = (props) => {
    const user = useSelector((state) => state.userReducer);

    const [modal, setModal] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
        props.getAnotherPost({ id: props.match.params.id });
        props.getComments({ id: props.match.params.id });
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    dayjs.extend(relativeTime);

    const postComment = async (e) => {
        e.preventDefault();

        await props.comment(
            {
                id: props.match.params.id,
                anotherUser: user.anotherUser,
                user: user.user,
            },
            { comment: comment }
        );

        setModal(false);
        setComment("");
    };

    const enabled = comment.length > 0 && comment.length < 50;

    if (user.post && user.post.status === "Invalid post.") {
        return (
            <p
                style={{
                    margin: "90px auto",
                    textAlign: "center",
                }}
            >
                Post not found.
            </p>
        );
    }

    if (!user.post) {
        return (
            <p
                style={{
                    margin: "90px auto",
                    textAlign: "center",
                }}
            >
                Post not found. It might have been deleted by the user.
            </p>
        );
    }

    return (
        <div className="another-post-container">
            <div className="another-post">
                <div className="another-post-box">
                    <Link
                        to={
                            user.post.by && user.post.by._id === user.user._id
                                ? `/profile`
                                : `/user/${user.post.by && user.post.by._id}`
                        }
                        className="another-post-user-link"
                    >
                        {user.post.by && user.post.by.image ? (
                            <img
                                className="another-post-user-image"
                                src={user.post.by.image}
                                alt=""
                            />
                        ) : (
                            <img
                                className="another-post-user-image"
                                src={noImg}
                                alt=""
                            />
                        )}
                    </Link>
                    <div className="another-post-user-date">
                        <p className="another-post-username">
                            {user.post.by && user.post.by.username}
                        </p>
                        <p className="another-post-date">
                            {dayjs(user.post.createdAt).fromNow(true)} ago
                        </p>
                    </div>
                </div>
                <p className="post">{user.post.post}</p>
                <div className="buttons-box">
                    <Button
                        onClick={() =>
                            props.like({
                                id: user.post._id,
                                anotherUser: user.post,
                                user: user.user,
                            })
                        }
                        className={
                            user.post.likedBy &&
                            user.post.likedBy.includes(user.user._id)
                                ? "liked"
                                : "like-button"
                        }
                    >
                        {user.post.likes}
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="heart-icon"
                        />
                    </Button>
                    <Button
                        onClick={() =>
                            props.dislike({
                                id: user.post._id,
                                anotherUser: user.post,
                                user: user.user,
                            })
                        }
                        className={
                            user.post.dislikedBy &&
                            user.post.dislikedBy.includes(user.user._id)
                                ? "disliked"
                                : "dislike-button"
                        }
                    >
                        {user.post.dislikes}
                        <FontAwesomeIcon
                            icon={faHeartBroken}
                            className="heart-icon"
                        />
                    </Button>
                    <Button
                        className="comment-button"
                        onClick={() => {
                            setModal(!modal);
                            setComment("");
                        }}
                    >
                        <FontAwesomeIcon
                            className="comment-icon"
                            icon={faCommentAlt}
                        />
                    </Button>
                </div>
                {modal && (
                    <div className="comment-box">
                        <input
                            placeholder="Your comment..."
                            id="comment"
                            name="comment"
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="comment-input"
                        />
                        <Button
                            onClick={postComment}
                            disabled={!enabled}
                            className="post-comment-button"
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
            <div className="comments-container">
                {user.comments.map((c, key) => {
                    return (
                        <div className="comments" key={key}>
                            <div className="comments-box">
                                <Link
                                    to={
                                        c.by && c.by._id === user.user._id
                                            ? `/profile`
                                            : `/user/${c.by && c.by._id}`
                                    }
                                    className="comment-user-link"
                                >
                                    {c.by.image ? (
                                        <img
                                            className="comment-user-image"
                                            src={c.by.image}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className="comment-user-image"
                                            src={noImg}
                                            alt=""
                                        />
                                    )}
                                </Link>
                                <div className="comment-user-date">
                                    <p className="comment-username">
                                        {c.by.username}
                                    </p>
                                    <p className="comment-date">
                                        {dayjs(c.createdAt).fromNow(true)} ago
                                    </p>
                                </div>
                            </div>
                            <p className="comment">{c.comment}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default connect(null, {
    getAnotherPost,
    like,
    dislike,
    getComments,
    comment,
})(withRouter(AnotherPost));
