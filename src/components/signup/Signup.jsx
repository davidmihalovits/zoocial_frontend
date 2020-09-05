import React, { useState, useEffect } from "react";
import "./Signup.sass";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { connect, useSelector } from "react-redux";
import { signup } from "../../redux/actions/actions";

const Signup = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState("");

    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (user.authenticated) {
            props.history.push("/profile");
        }
        window.scrollTo(0, 0);
    });

    const showPassword = () => {
        setHidden(!hidden);
    };

    const signup = (e) => {
        e.preventDefault();

        props.signup({
            username: username,
            email: email,
            password: password,
        });
    };

    const enabled =
        username.length > 0 && email.length > 0 && password.length > 0;

    return (
        <div className="signup">
            <h1 className="signup-title">Signup</h1>
            <p className="fake">Feel free to use a fake email here.</p>
            <form className="signup-form" onSubmit={signup} noValidate>
                <label className="signup-label" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="signup-input"
                />
                <label className="signup-label" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                />
                <label className="signup-label" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type={hidden ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                />
                {hidden ? (
                    <FontAwesomeIcon
                        onClick={showPassword}
                        className="signup-show-hide"
                        icon={faEyeSlash}
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={showPassword}
                        className="signup-show-hide"
                        icon={faEye}
                    />
                )}
                <Button
                    className="signup-button"
                    type="submit"
                    disabled={!enabled || user.loading}
                >
                    {user.loading && (
                        <FontAwesomeIcon
                            className="signup-spinner"
                            spin
                            icon={faSpinner}
                        />
                    )}{" "}
                    Signup
                </Button>
            </form>
            <p className="not-a-user">
                Already a user?{" "}
                <Link className="login-link" to="/login">
                    Login
                </Link>
                .
            </p>
            {user.error && <div className="signup-error">{user.error}</div>}
        </div>
    );
};

export default connect(null, { signup })(withRouter(Signup));
