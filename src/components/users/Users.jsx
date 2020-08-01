import React, { useEffect } from "react";
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

    return (
        <div className="users">
            {user.users
                .filter((a) => {
                    if (user.user._id === a._id) {
                        return false;
                    }
                    return true;
                })
                .map((a) => {
                    return (
                        <div key={a._id} className="users-list">
                            <Link to={`/user/${a._id}`}>
                                <Button>
                                    <div className="users-list-card">
                                        {a.image ? (
                                            <img src={a.image} alt="" />
                                        ) : (
                                            <img src={noImg} alt="" />
                                        )}
                                        <p>{a.username}</p>
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
