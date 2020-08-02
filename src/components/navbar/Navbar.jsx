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
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { searchAll, getNotifications } from "../../redux/actions/actions";
const socket = require("socket.io-client")("http://localhost:5000");

const Navbar = (props) => {
    const [search, setSearch] = useState("");

    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        props.getNotifications();
    }, [props]);

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

    const abc = user.notifications.map((a) => a.read);

    socket.emit("user", user.user);

    socket
        .off("notification")
        .on("notification", () => props.getNotifications());

    return (
        <div className="navbar">
            <div className="top">
                <Link to="/">
                    <h1 className="title">zoocial</h1>
                </Link>
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
                            {abc.includes(false) && (
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
})(withRouter(Navbar));
