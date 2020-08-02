import React, { useEffect } from "react";
import "./Notifications.sass";
import Button from "@material-ui/core/Button";
import {
    getNotifications,
    readNotification,
} from "../../redux/actions/actions";
import { connect, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Notifications = (props) => {
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        props.readNotification();
        window.scrollTo(0, 0);
    }, []);

    dayjs.extend(relativeTime);

    return (
        <div className="notifications">
            {user.notifications
                .map((a, key) => {
                    return (
                        <div className="notification" key={key}>
                            <Link
                                to={
                                    a.notification.includes("started following")
                                        ? `/user/${a.sender._id}`
                                        : `/post/${a.post}`
                                }
                            >
                                <Button>
                                    <div className="notification-flex">
                                        <img src={a.sender.image} alt="" />
                                        <div className="notification-date">
                                            <p>{a.notification}</p>
                                            <p
                                                style={{
                                                    color: "#d1d1d1",
                                                    fontSize: "12px",
                                                    marginTop: "5px",
                                                }}
                                            >
                                                {dayjs(a.createdAt).fromNow(
                                                    true
                                                )}{" "}
                                                ago
                                            </p>
                                        </div>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    );
                })
                .reverse()}
        </div>
    );
};

export default connect(null, {
    getNotifications,
    readNotification,
})(withRouter(Notifications));
