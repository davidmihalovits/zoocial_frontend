import React, { useEffect, useState } from "react";
import "./Users.sass";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { users } from "../../redux/actions/actions";
import noImg from "../../assets/noImg.png";

const Users = (props) => {
    useEffect(() => {
        props.users();
        window.scrollTo(0, 0);
    }, [props]);

    const user = useSelector((state) => state.userReducer);

    const [search, setSearch] = useState(null);

    const searchUser = (e) => {
        let keyword = e.target.value;
        setSearch(keyword);
    };

    return (
        <div className="users">
            <input
                type="text"
                placeholder="Search users..."
                onChange={(e) => searchUser(e)}
                className="search"
            />
            {user.users
                .filter((a) => {
                    if (user.user._id === a._id) {
                        return false;
                    }
                    return true;
                })
                .filter((a) => {
                    if (search === null) {
                        return a;
                    } else if (
                        a.username.toLowerCase().includes(search.toLowerCase())
                    ) {
                        return a;
                    }
                    return false;
                })
                .map((a) => {
                    return (
                        <div key={a._id} className="users-list">
                            <Link to={`/user/${a._id}`} a={a}>
                                <Button>
                                    <div className="users-list-card">
                                        <p>{a.username}</p>
                                        {a.image ? (
                                            <img src={a.image} alt="" />
                                        ) : (
                                            <img src={noImg} alt="" />
                                        )}
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default connect(null, { users })(withRouter(Users));
