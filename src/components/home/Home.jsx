import React, { useEffect } from "react";
import "./Home.sass";
import { withRouter } from "react-router-dom";

const Home = (props) => {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            props.history.push("/profile");
        }
        window.scrollTo(0, 0);
    });

    return (
        <div className="home">
            <h1>Home</h1>
        </div>
    );
};

export default withRouter(Home);
