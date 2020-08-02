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
    faSpinner,
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
    }, [props]);

    dayjs.extend(relativeTime);

    const postComment = async (e) => {
        e.preventDefault();

        await props.comment({
            comment: comment,
            id: props.match.params.id,
            user: user.post,
        });

        setModal(false);
        setComment("");
    };

    const enabled = comment.length > 0 && comment.length < 50;

    return (
        <div>
            {user.loading ? (
                <div style={{ textAlign: "center" }}>
                    <FontAwesomeIcon
                        className="spinner"
                        icon={faSpinner}
                        spin
                    />
                </div>
            ) : (
                <div className="another-post">
                    <div className="container">
                        <div className="the-post">
                            <div className="another-post-flexbox">
                                <Link
                                    to={
                                        user.post.by &&
                                        user.post.by._id === user.user._id
                                            ? `/profile`
                                            : `/user/${
                                                  user.post.by &&
                                                  user.post.by._id
                                              }`
                                    }
                                >
                                    {user.post.by && user.post.by.image ? (
                                        <img src={user.post.by.image} alt="" />
                                    ) : (
                                        <img src={noImg} alt="" />
                                    )}
                                </Link>
                                <div>
                                    <p>
                                        {user.post.by && user.post.by.username}
                                    </p>
                                    <p
                                        style={{
                                            color: "#d1d1d1",
                                            fontSize: "12px",
                                            marginTop: "5px",
                                        }}
                                    >
                                        {dayjs(user.post.createdAt).fromNow(
                                            true
                                        )}{" "}
                                        ago
                                    </p>
                                </div>
                            </div>
                            <p className="post">{user.post.post}</p>
                            <div className="buttons-flex">
                                <Button
                                    onClick={() =>
                                        props.like(
                                            {
                                                id: user.post._id,
                                            },
                                            {
                                                user: user.user,
                                            },
                                            {
                                                post: user.post,
                                            }
                                        )
                                    }
                                    className={
                                        user.post.likedBy &&
                                        user.post.likedBy.includes(
                                            user.user._id
                                        )
                                            ? "liked"
                                            : "like-button"
                                    }
                                >
                                    {user.post.likes}
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
                                                id: user.post._id,
                                            },
                                            {
                                                user: user.user,
                                            },
                                            {
                                                post: user.post,
                                            }
                                        )
                                    }
                                    className={
                                        user.post.dislikedBy &&
                                        user.post.dislikedBy.includes(
                                            user.user._id
                                        )
                                            ? "disliked"
                                            : "dislike-button"
                                    }
                                >
                                    {user.post.dislikes}
                                    <FontAwesomeIcon
                                        icon={faHeartBroken}
                                        style={{
                                            marginLeft: "10px",
                                        }}
                                    />
                                </Button>
                                <Button
                                    className="comment-button"
                                    onClick={() => {
                                        setModal(!modal);
                                        setComment("");
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCommentAlt} />
                                </Button>
                                {modal && (
                                    <div className="modal">
                                        <input
                                            placeholder="Your comment..."
                                            id="comment"
                                            name="comment"
                                            type="text"
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        />
                                        <Button
                                            onClick={postComment}
                                            disabled={!enabled}
                                            className="post-comment-button"
                                        >
                                            Post
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {user.comments.map((c, key) => {
                        return (
                            <div className="comments" key={key}>
                                <div className="comments-flexbox">
                                    <Link
                                        to={
                                            c.by && c.by._id === user.user._id
                                                ? `/profile`
                                                : `/user/${c.by && c.by._id}`
                                        }
                                    >
                                        {c.by.image ? (
                                            <img src={c.by.image} alt="" />
                                        ) : (
                                            <img src={noImg} alt="" />
                                        )}
                                    </Link>
                                    <div>
                                        <p>{c.by.username}</p>
                                        <p
                                            style={{
                                                color: "#d1d1d1",
                                                fontSize: "12px",
                                                marginTop: "5px",
                                            }}
                                        >
                                            {dayjs(c.createdAt).fromNow(true)}{" "}
                                            ago
                                        </p>
                                    </div>
                                </div>
                                <p className="comment">{c.comment}</p>
                            </div>
                        );
                    })}
                </div>
            )}
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
