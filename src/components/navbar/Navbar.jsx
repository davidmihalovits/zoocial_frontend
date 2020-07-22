import React, { useState } from "react";
import "./Navbar.sass";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListAlt,
    faUserFriends,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/noImg.png";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { logout, postPost } from "../../redux/actions/actions";

const Navbar = (props) => {
    const [modal, setModal] = useState(false);
    const [post, setPost] = useState("");

    const user = useSelector((state) => state.userReducer);

    const logout = () => {
        props.logout();
        props.history.push("/");
    };

    const postPost = (e) => {
        e.preventDefault();

        props.postPost({
            post: post,
        });

        setModal(false);
        setPost("");
    };

    const enabled = post.length > 0 && post.length < 100;

    return (
        <div className="navbar">
            <div className="top">
                <Link to="/">zoocial</Link>
                <div>
                    {user.authenticated ? (
                        <Button onClick={logout}>Logout</Button>
                    ) : (
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                </div>
            </div>
            {user.authenticated && (
                <div className="bottom">
                    <Button
                        onClick={() => {
                            setModal(!modal);
                            setPost("");
                        }}
                        className="post-button"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                    </Button>
                    {modal && (
                        <div className="modal">
                            <input
                                placeholder="Your post..."
                                id="post"
                                name="post"
                                type="text"
                                value={post}
                                onChange={(e) => setPost(e.target.value)}
                            />
                            <Button onClick={postPost} disabled={!enabled}>
                                Post
                            </Button>
                        </div>
                    )}

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

export default connect(null, { logout, postPost })(withRouter(Navbar));
