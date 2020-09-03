import React, { useState } from "react";
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
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
    searchAll,
    getNotifications,
    readNotification,
} from "../../redux/actions/actions";
const socket = require("socket.io-client")(
    "https://zoocial-backend.herokuapp.com"
);

const Navbar = (props) => {
    const [search, setSearch] = useState("");

    const user = useSelector((state) => state.userReducer);

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

    const newNotification = user.notifications.map((a) => a.read);

    socket.emit("user", user.user);
    socket
        .off("notification")
        .on("notification", () => props.getNotifications());

    if (!user.authenticated) {
        return (
            <div className="navbar-container-auth-false">
                <div className="navbar-inner">
                    <Link className="title-link" to="/">
                        <h1 className="title">zoocial</h1>
                    </Link>
                    <Link className="login-button-link" to="/login">
                        <Button className="login-button">Login</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (user.authenticated) {
        return (
            <div className="navbar-container-auth-true">
                <div className="navbar-top">
                    <div className="navbar-top-inner">
                        <Link className="title-link" to="/">
                            <h1 className="title">zoocial</h1>
                        </Link>

                        <div className="navbar-bottom-middle">
                            <div className="navbar-bottom-inner">
                                <NavLink
                                    className="navlink"
                                    to="/feed"
                                    activeClassName="active"
                                >
                                    <Button className="navlink-button">
                                        <div className="navlink-box">
                                            <FontAwesomeIcon
                                                icon={faListAlt}
                                                className="navlink-icon"
                                            />
                                            <p className="navlink-text">Feed</p>
                                        </div>
                                    </Button>
                                </NavLink>
                                <NavLink
                                    className="navlink"
                                    to="/discover"
                                    activeClassName="active"
                                >
                                    <Button className="navlink-button">
                                        <div className="navlink-box">
                                            <FontAwesomeIcon
                                                icon={faUserFriends}
                                                className="navlink-icon"
                                            />
                                            <p className="navlink-text">
                                                Discover
                                            </p>
                                        </div>
                                    </Button>
                                </NavLink>
                                <NavLink
                                    className="navlink"
                                    to="/postSomething"
                                    activeClassName="active"
                                >
                                    <Button className="navlink-button">
                                        <div className="navlink-box">
                                            <FontAwesomeIcon
                                                icon={faPaperPlane}
                                                className="navlink-icon"
                                            />
                                            <p className="navlink-text">Post</p>
                                        </div>
                                    </Button>
                                </NavLink>
                                <NavLink
                                    className="navlink"
                                    to="/profile"
                                    activeClassName="active"
                                >
                                    <Button className="navlink-button">
                                        <div className="navlink-box">
                                            {user.user.image ? (
                                                <img
                                                    className="navbar-user-image"
                                                    src={user.user.image}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    className="navbar-user-image"
                                                    src={noImg}
                                                    alt=""
                                                />
                                            )}
                                            <p className="navlink-text">
                                                {user.user.username}
                                            </p>
                                        </div>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="navbar-inner-right">
                            <input
                                className="search-input"
                                placeholder="Search"
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
                            <Link className="bell-link" to="/notifications">
                                <FontAwesomeIcon
                                    className="bell-icon"
                                    icon={faBell}
                                />
                                {newNotification.includes(false) && (
                                    <FontAwesomeIcon
                                        className="badge"
                                        icon={faCertificate}
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="navbar-bottom">
                    <div className="navbar-bottom-inner">
                        <NavLink
                            className="navlink"
                            to="/feed"
                            activeClassName="active"
                        >
                            <Button className="navlink-button">
                                <div className="navlink-box">
                                    <FontAwesomeIcon
                                        icon={faListAlt}
                                        className="navlink-icon"
                                    />
                                    <p className="navlink-text">Feed</p>
                                </div>
                            </Button>
                        </NavLink>
                        <NavLink
                            className="navlink"
                            to="/discover"
                            activeClassName="active"
                        >
                            <Button className="navlink-button">
                                <div className="navlink-box">
                                    <FontAwesomeIcon
                                        icon={faUserFriends}
                                        className="navlink-icon"
                                    />
                                    <p className="navlink-text">Discover</p>
                                </div>
                            </Button>
                        </NavLink>
                        <NavLink
                            className="navlink"
                            to="/postSomething"
                            activeClassName="active"
                        >
                            <Button className="navlink-button">
                                <div className="navlink-box">
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        className="navlink-icon"
                                    />
                                    <p className="navlink-text">Post</p>
                                </div>
                            </Button>
                        </NavLink>
                        <NavLink
                            className="navlink"
                            to="/profile"
                            activeClassName="active"
                        >
                            <Button className="navlink-button">
                                <div className="navlink-box">
                                    {user.user.image ? (
                                        <img
                                            className="navbar-user-image"
                                            src={user.user.image}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className="navbar-user-image"
                                            src={noImg}
                                            alt=""
                                        />
                                    )}
                                    <p className="navlink-text">
                                        {user.user.username}
                                    </p>
                                </div>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(null, {
    searchAll,
    getNotifications,
    readNotification,
})(withRouter(Navbar));
