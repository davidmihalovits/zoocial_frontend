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
import noImg from "../../assets/noImg.png";

const Notifications = (props) => {
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        props.readNotification();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
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
                                className="notification-link"
                            >
                                <Button className="notification-button">
                                    <div className="notification-box">
                                        {a.sender.image ? (
                                            <img
                                                className="notification-user-image"
                                                src={a.sender.image}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="notification-user-image"
                                                src={noImg}
                                                alt=""
                                            />
                                        )}
                                        <div className="notification-date-text">
                                            <p className="notification-text">
                                                {a.notification}
                                            </p>
                                            <p className="notification-date">
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
