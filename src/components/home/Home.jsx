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
            <div className="home-box">
                <h1 className="home-title">There we go</h1>
                <p className="home-paragraph">
                    Welcome to my social media app clone! I built this capstone
                    project in my free time to enhance and showcase my skills.
                    Please take a look and have a good time!
                </p>
            </div>
            <div className="home-box">
                <h1 className="home-title">It's fun</h1>
                <p className="home-paragraph">
                    You're going to find some cool things such as CRUD
                    functionalities, server-side authentication, global state
                    management and so on.
                </p>
            </div>
            <div className="home-box">
                <h1 className="home-title">Not finished yet</h1>
                <p className="home-paragraph">
                    I'm not done with this project yet because I learn new
                    things every day and implement them here. I also improve
                    code readability and performance.
                </p>
            </div>
        </div>
    );
};

export default Home;
