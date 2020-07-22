import React, { useEffect } from "react";
import "./Feed.sass";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { feed, like, dislike } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faHeartBroken,
    faCommentAlt,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/noImg.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Feed = (props) => {
    dayjs.extend(relativeTime);

    useEffect(() => {
        props.feed();
        window.scrollTo(0, 0);
    }, [props]);

    const user = useSelector((state) => state.userReducer);

    return (
        <div className="feed">
            {user.loading ? (
                <FontAwesomeIcon className="spinner" icon={faSpinner} spin />
            ) : (
                <>
                    {user.posts &&
                        user.posts
                            .map((a, key) => {
                                return (
                                    <div className="feed-posts" key={key}>
                                        <div className="feed-post">
                                            <div className="feed-flexbox">
                                                {a.by.image ? (
                                                    <img
                                                        src={a.by.image}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <img src={noImg} alt="" />
                                                )}
                                                <div>
                                                    <p>{a.by.username}</p>
                                                    <p
                                                        style={{
                                                            color: "#d1d1d1",
                                                            fontSize: "12px",
                                                            marginTop: "5px",
                                                        }}
                                                    >
                                                        {dayjs(
                                                            a.createdAt
                                                        ).fromNow(true)}{" "}
                                                        ago
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="post">{a.post}</p>

                                            <Button
                                                style={{
                                                    color: "#42a5f5",
                                                    fontSize: "14px",
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
                                                    fontSize: "14px",
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
                                            <Button
                                                style={{
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCommentAlt}
                                                    style={{
                                                        marginLeft: "10px",
                                                        color: "#505050",
                                                    }}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })
                            .reverse()}
                    {user.posts.length === 0 && (
                        <p
                            style={{
                                textAlign: "center",
                                width: "280px",
                                margin: "20px auto",
                            }}
                        >
                            Posts of people you're following should appear here.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default connect(null, { feed, like, dislike })(withRouter(Feed));
