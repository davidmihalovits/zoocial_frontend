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
        const token = localStorage.getItem("token");
        if (token) {
            props.history.push("/feed");
        }
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
            <h1>Login</h1>
            <form onSubmit={login} noValidate>
                <input
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type={hidden ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <Button type="submit" disabled={!enabled || user.loading}>
                    {user.loading ? (
                        <FontAwesomeIcon
                            className="login-spinner"
                            spin
                            icon={faSpinner}
                        />
                    ) : (
                        "Login"
                    )}
                </Button>
            </form>
            <p>
                Not a user yet? <Link to="/signup">Signup</Link>.
            </p>
            {user.error && <div className="error">{user.error}</div>}
        </div>
    );
};

export default connect(null, { login })(withRouter(Login));
