import React, { useState, useEffect } from "react";
import "./Login.sass";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { connect, useSelector } from "react-redux";
import { login } from "../../redux/actions/actions";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState("");

    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (user.authenticated) {
            props.history.push("/feed");
        }
        window.scrollTo(0, 0);
    });

    const showPassword = () => {
        setHidden(!hidden);
    };

    const login = (e) => {
        e.preventDefault();

        props.login({
            email: email,
            password: password,
        });
    };

    const enabled = email.length > 0 && password.length > 0;

    return (
        <div className="login">
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={login} noValidate>
                <label className="login-label" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <label className="login-label" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type={hidden ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                {hidden ? (
                    <FontAwesomeIcon
                        onClick={showPassword}
                        className="login-show-hide"
                        icon={faEyeSlash}
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={showPassword}
                        className="login-show-hide"
                        icon={faEye}
                    />
                )}
                <Button
                    className="login-button"
                    type="submit"
                    disabled={!enabled || user.loading}
                >
                    {user.loading && (
                        <FontAwesomeIcon
                            className="login-spinner"
                            spin
                            icon={faSpinner}
                        />
                    )}{" "}
                    Login
                </Button>
            </form>
            <p className="not-a-user">
                Not a user yet?{" "}
                <Link className="signup-link" to="/signup">
                    Signup
                </Link>
                .
            </p>
            {user.error && <div className="login-error">{user.error}</div>}
        </div>
    );
};

export default connect(null, { login })(withRouter(Login));
