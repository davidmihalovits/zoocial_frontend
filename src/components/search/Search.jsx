import React, { useEffect } from "react";
import "./Search.sass";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import noImg from "../../assets/noImg.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Search = () => {
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    dayjs.extend(relativeTime);

    const posts = user.search.posts && user.search.posts.map((a) => a);
    const users = user.search.users && user.search.users.map((a) => a);

    return (
        <div className="search">
            {user.search.users &&
                users.length === 0 &&
                user.search.posts &&
                posts.length === 0 && (
                    <p className="nothing">Nothing here. :(</p>
                )}
            <div className="search-users">
                {user.search.users && users.length > 0 && (
                    <h1 className="search-users-title">Users</h1>
                )}
                <div className="search-users-container">
                    {user.search.users &&
                        user.search.users.map((a, key) => {
                            return (
                                <div
                                    className="search-users-container-inner"
                                    key={key}
                                >
                                    <Link
                                        to={
                                            a._id === user.user._id
                                                ? `/profile`
                                                : `/user/${a._id}`
                                        }
                                        className="search-users-link"
                                    >
                                        <Button className="search-users-button">
                                            <div className="search-users-card">
                                                {a.image ? (
                                                    <img
                                                        className="search-users-image"
                                                        src={a.image}
                                                        alt=""
                                                    />
                                                ) : (
                                                    <img
                                                        className="search-users-image"
                                                        src={noImg}
                                                        alt=""
                                                    />
                                                )}
                                                <p className="search-username">
                                                    {a.username}
                                                </p>
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="search-posts">
                {user.search.posts && posts.length > 0 && (
                    <h1 className="search-posts-title">Posts</h1>
                )}
                <div className="search-posts-container">
                    {user.search.posts &&
                        user.search.posts.map((a, key) => {
                            return (
                                <div
                                    className="search-posts-container-inner"
                                    key={key}
                                >
                                    <Link
                                        className="search-posts-link"
                                        to={`/post/${a._id}`}
                                    >
                                        <Button className="search-posts-button">
                                            <div className="search-posts-card">
                                                <div className="search-posts-image-date">
                                                    {a.by.image ? (
                                                        <img
                                                            className="search-users-image"
                                                            src={a.by.image}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            className="search-users-image"
                                                            src={noImg}
                                                            alt=""
                                                        />
                                                    )}
                                                    <div className="search-posts-card-box">
                                                        <p className="search-username">
                                                            {a.by.username}
                                                        </p>
                                                        <p className="search-date">
                                                            {dayjs(
                                                                a.createdAt
                                                            ).fromNow(
                                                                true
                                                            )}{" "}
                                                            ago
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="search-post">
                                                    {a.post}
                                                </p>
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Search);
