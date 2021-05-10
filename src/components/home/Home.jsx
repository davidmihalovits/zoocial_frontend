import React, { useEffect } from "react";
import "./Home.sass";
import { useSelector } from "react-redux";

const Home = (props) => {
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (user.authenticated) {
            props.history.push("/profile");
        }
        window.scrollTo(0, 0);
    });

    return (
        <div className="home">
            <p className="home-paragraph">
                Welcome to my social media app clone. Log in or sign up to
                begin.
            </p>
            <p className="home-paragraph">
                Frontend code:{" "}
                <a
                    href="https://github.com/davidmihalovits/zoocial_frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                >
                    https://github.com/davidmihalovits/zoocial_frontend
                </a>
            </p>
            <p className="home-paragraph">
                Backend code:{" "}
                <a
                    href="https://github.com/davidmihalovits/zoocial_backend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                >
                    https://github.com/davidmihalovits/zoocial_backend
                </a>
            </p>
        </div>
    );
};

export default Home;
