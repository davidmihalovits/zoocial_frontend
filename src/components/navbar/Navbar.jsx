import React, { useState, useEffect } from "react";
import "./Navbar.sass";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListAlt,
    faUserFriends,
    faSearch,
    faBell,
    faCertificate,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/noImg.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
    searchAll,
    getNotifications,
    readNotification,
} from "../../redux/actions/actions";
const socket = require("socket.io-client")("http://localhost:5000");

const Navbar = (props) => {
    const [search, setSearch] = useState("");
    const [notificationsModal, setNotificationsModal] = useState(false);

    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        props.getNotifications();
    }, [props]);

    dayjs.extend(relativeTime);

    const searchAll = (e) => {
        e.preventDefault();

        props.searchAll(
            {
                search: search,
            },
            props.history
        );

        setSearch("");
    };

    const openNotificationsModal = () => {
        setNotificationsModal(!notificationsModal);
        if (!notificationsModal) props.readNotification();
    };

    const newNotification = user.notifications.map((a) => a.read);

    socket.emit("user", user.user);

    socket
        .off("notification")
        .on("notification", () => props.getNotifications());

    return (
        <div className="navbar">
            <div className="top">
                <div className="top-inner">
                    <Link to="/">
                        <h1 className="title">zoocial</h1>
                    </Link>
                    {user.authenticated && (
                        <div className="top-middle">
                            <NavLink to="/feed" activeClassName="active">
                                <Button>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faListAlt}
                                            size="2x"
                                        />
                                        <p>Feed</p>
                                    </div>
                                </Button>
                            </NavLink>
                            <NavLink to="/discover" activeClassName="active">
                                <Button>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faUserFriends}
                                            size="2x"
                                        />
                                        <p>Discover</p>
                                    </div>
                                </Button>
                            </NavLink>
                            <NavLink to="/postSomething">
                                <Button>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faPaperPlane}
                                            size="2x"
                                        />
                                        <p>Post</p>
                                    </div>
                                </Button>
                            </NavLink>
                            <NavLink to="/profile">
                                <Button>
                                    <div>
                                        {user.user.image ? (
                                            <img src={user.user.image} alt="" />
                                        ) : (
                                            <img src={noImg} alt="" />
                                        )}
                                        <p>{user.user.username}</p>
                                    </div>
                                </Button>
                            </NavLink>
                        </div>
                    )}
                    <div className="top-right">
                        {user.authenticated ? (
                            <>
                                <input
                                    className="search-input"
                                    placeholder={
                                        user.error ? user.error : "Search..."
                                    }
                                    id="search"
                                    name="search"
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <FontAwesomeIcon
                                    className="search-button"
                                    icon={faSearch}
                                    onClick={searchAll}
                                />
                                <Link to="/notifications">
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        className="bell"
                                    />
                                </Link>
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="bell-modal"
                                    onClick={openNotificationsModal}
                                />
                                {newNotification.includes(false) && (
                                    <p className="badge">
                                        <FontAwesomeIcon icon={faCertificate} />
                                    </p>
                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <Button className="login-button">Login</Button>
                            </Link>
                        )}
                        {notificationsModal && (
                            <div className="notifications-modal">
                                {user.notifications
                                    .map((a, key) => {
                                        return (
                                            <div
                                                className="notification"
                                                key={key}
                                            >
                                                <Link
                                                    to={
                                                        a.notification.includes(
                                                            "started following"
                                                        )
                                                            ? `/user/${a.sender._id}`
                                                            : `/post/${a.post}`
                                                    }
                                                    onClick={() =>
                                                        setNotificationsModal(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <Button>
                                                        <div className="notification-flex">
                                                            {a.sender.image ? (
                                                                <img
                                                                    src={
                                                                        a.sender
                                                                            .image
                                                                    }
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={noImg}
                                                                    alt=""
                                                                />
                                                            )}
                                                            <div className="notification-date">
                                                                <p>
                                                                    {
                                                                        a.notification
                                                                    }
                                                                </p>
                                                                <p
                                                                    style={{
                                                                        color:
                                                                            "#d1d1d1",
                                                                        fontSize:
                                                                            "12px",
                                                                        marginTop:
                                                                            "5px",
                                                                    }}
                                                                >
                                                                    {dayjs(
                                                                        a.createdAt
                                                                    ).fromNow(
                                                                        true
                                                                    )}{" "}
                                                                    ago
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    })
                                    .reverse()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {user.authenticated && (
                <div className="bottom">
                    <NavLink to="/feed" activeClassName="active">
                        <Button>
                            <div>
                                <FontAwesomeIcon icon={faListAlt} size="2x" />
                                <p>Feed</p>
                            </div>
                        </Button>
                    </NavLink>
                    <NavLink to="/discover" activeClassName="active">
                        <Button>
                            <div>
                                <FontAwesomeIcon
                                    icon={faUserFriends}
                                    size="2x"
                                />
                                <p>Discover</p>
                            </div>
                        </Button>
                    </NavLink>
                    <NavLink to="/postSomething">
                        <Button>
                            <div>
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    size="2x"
                                />
                                <p>Post</p>
                            </div>
                        </Button>
                    </NavLink>
                    <NavLink to="/profile">
                        <Button>
                            <div>
                                {user.user.image ? (
                                    <img src={user.user.image} alt="" />
                                ) : (
                                    <img src={noImg} alt="" />
                                )}
                                <p>{user.user.username}</p>
                            </div>
                        </Button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default connect(null, {
    searchAll,
    getNotifications,
    readNotification,
})(withRouter(Navbar));
