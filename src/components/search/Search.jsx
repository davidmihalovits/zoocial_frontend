import React, { useEffect } from "react";
import "./Search.sass";
import { useSelector } from "react-redux";
import noImg from "../../assets/noImg.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Search = (props) => {
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    dayjs.extend(relativeTime);

    const posts = user.search.posts && user.search.posts.map((a) => a);
    const users = user.search.users && user.search.users.map((a) => a);

    return (
        <div className="search">
            {user.loading ? (
                "Loading..."
            ) : (
                <>
                    {user.search.users && users.length > 0 && (
                        <p className="search-users">Users:</p>
                    )}
                    {user.search.users &&
                        user.search.users.map((a, key) => {
                            return (
                                <Link
                                    to={
                                        a._id === user.user._id
                                            ? `/profile`
                                            : `/user/${a._id}`
                                    }
                                    key={key}
                                >
                                    <div className="search-card-users">
                                        {a.image ? (
                                            <img src={a.image} alt="" />
                                        ) : (
                                            <img src={noImg} alt="" />
                                        )}
                                        <div className="search-card-flex">
                                            <p className="search-username">
                                                {a.username}
                                            </p>
                                            <p
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
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}

                    {user.search.posts && posts.length > 0 && (
                        <p className="search-posts">Posts:</p>
                    )}
                    {user.search.posts &&
                        user.search.posts.map((a, key) => {
                            return (
                                <Link to={`/post/${a._id}`} key={key}>
                                    <div className="search-card-posts">
                                        <div className="search-card-flex-all">
                                            {a.by.image ? (
                                                <img src={a.by.image} alt="" />
                                            ) : (
                                                <img src={noImg} alt="" />
                                            )}
                                            <div className="search-card-flex">
                                                <p>{a.by.username}</p>
                                                <p
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
                                                </p>
                                            </div>
                                        </div>
                                        <p className="search-post">{a.post}</p>
                                    </div>
                                </Link>
                            );
                        })}
                </>
            )}
        </div>
    );
};

export default withRouter(Search);
