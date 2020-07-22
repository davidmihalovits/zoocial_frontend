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
        const token = localStorage.getItem("token");
        if (token) {
            props.history.push("/profile");
        }
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
            <h1>Signup</h1>
            <form onSubmit={signup} noValidate>
                <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                        className="show-hide"
                        icon={faEyeSlash}
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={showPassword}
                        className="show-hide"
                        icon={faEye}
                    />
                )}
                <Button type="submit" disabled={!enabled || user.loading}>
                    {user.loading ? (
                        <FontAwesomeIcon
                            className="spinner"
                            spin
                            icon={faSpinner}
                        />
                    ) : (
                        "Signup"
                    )}
                </Button>
            </form>
            <p>
                Already a user? <Link to="/login">Login</Link>.
            </p>
            {user.error && <div className="error">{user.error}</div>}
        </div>
    );
};

export default connect(null, { signup })(withRouter(Signup));
