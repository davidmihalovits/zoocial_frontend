import React, { useEffect } from "react";
import "./App.sass";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { connect } from "react-redux";
import { profile } from "./redux/actions/actions";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import Users from "./components/users/Users";
import AnotherUser from "./components/anotherUser/AnotherUser";
import AnotherPost from "./components/anotherPost/AnotherPost";
import Feed from "./components/feed/Feed";
import Search from "./components/search/Search";
import Post from "./components/post/Post";
import Notifications from "./components/notifications/Notifications";

const App = (props) => {
    useEffect(() => {
        props.profile();
    }, [props]);

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch>
                    <Home exact path="/" component={Home} />
                    <Login path="/login" component={Login} />
                    <Signup path="/signup" component={Signup} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/discover" component={Users} />
                    <PrivateRoute path="/feed" component={Feed} />
                    <PrivateRoute path="/search" component={Search} />
                    <PrivateRoute path="/user/:id" component={AnotherUser} />
                    <PrivateRoute path="/post/:id" component={AnotherPost} />
                    <PrivateRoute path="/postSomething" component={Post} />
                    <PrivateRoute
                        path="/notifications"
                        component={Notifications}
                    />
                    <Route path="*" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default connect(null, {
    profile,
})(App);
