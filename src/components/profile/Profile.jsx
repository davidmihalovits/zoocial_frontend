import React, { useState, useEffect } from "react";
import "./Profile.sass";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
    profile,
    like,
    dislike,
    deletePost,
    updateProfile,
    getMyPosts,
    logout,
} from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faHeart,
    faHeartBroken,
    faTrash,
    faTimes,
    faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/noImg.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { storage } from "../../firebase";

const Profile = (props) => {
    const user = useSelector((state) => state.userReducer);

    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState(user.user.username);
    const [age, setAge] = useState(user.user.age);
    const [gender, setGender] = useState(user.user.gender);
    const [bio, setBio] = useState(user.user.bio);
    const [location, setLocation] = useState(user.user.location);
    const [website, setWebsite] = useState(user.user.website);
    const [loading, setLoading] = useState(false);

    dayjs.extend(relativeTime);

    useEffect(() => {
        props.getMyPosts();
        props.profile();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);

    const update = (e) => {
        e.preventDefault();

        props.updateProfile({
            username: username,
            age: age,
            gender: gender,
            bio: bio,
            location: location,
            website: website,
        });

        setModal(false);
    };

    const imageOnChange = (e) => {
        setLoading(true);

        const image = e.target.files[0];
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        const u = url;
                        props.updateProfile({
                            image: u,
                        });
                    })
                    .then(() => {
                        setLoading(false);
                    });
            }
        );
    };

    return (
        <div className="profile">
            <div className="profile-wide-box">
                <div className="profile-wide-left">
                    <h1 className="profile-title">{user.user.username}</h1>
                    {user.user.image ? (
                        <div className="profile-image-box">
                            <input
                                style={{ display: "none" }}
                                name="image"
                                id="image"
                                type="file"
                                accept=".jpg, .png, .jpeg"
                                value={""}
                                onChange={imageOnChange}
                            />
                            <label className="profile-label" htmlFor="image">
                                {loading ? (
                                    <div className="profile-image-loading-box">
                                        <FontAwesomeIcon
                                            className="profile-image-loading"
                                            icon={faSpinner}
                                            spin
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={user.user.image}
                                        alt="profile pic"
                                        className="profile-image"
                                    />
                                )}
                            </label>
                        </div>
                    ) : (
                        <div className="profile-image-box">
                            <input
                                style={{ display: "none" }}
                                name="image"
                                id="image"
                                type="file"
                                accept=".jpg, .png, .jpeg"
                                value={""}
                                onChange={imageOnChange}
                            />
                            <label className="profile-label" htmlFor="image">
                                {loading ? (
                                    <div className="profile-image-loading-box">
                                        <FontAwesomeIcon
                                            className="profile-image-loading"
                                            icon={faSpinner}
                                            spin
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={noImg}
                                        alt="no profile pic"
                                        className="profile-image"
                                    />
                                )}
                            </label>
                        </div>
                    )}
                    <p className="bio">{user.user.bio}</p>
                </div>
                <div className="profile-wide-right">
                    <div className="user-details">
                        <p>{user.user.age}</p>
                        <p>{user.user.gender}</p>
                        <p>{user.user.location}</p>
                        <p>
                            <a
                                href={user.user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="website-link"
                            >
                                {user.user.website}
                            </a>
                        </p>
                        <p>
                            Member for{" "}
                            {dayjs(user.user.createdAt).fromNow(true)}
                        </p>
                    </div>
                    <div className="edit-logout-button-box">
                        <Button
                            className="edit-logout-button"
                            onClick={() => {
                                setModal(!modal);
                                setUsername(user.user.username);
                                setAge(user.user.age);
                                setGender(user.user.gender);
                                setBio(user.user.bio);
                                setLocation(user.user.location);
                                setWebsite(user.user.website);
                            }}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            className="edit-logout-button"
                            onClick={() => props.logout(props.history)}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal">
                    <div className="modal-close-container">
                        <FontAwesomeIcon
                            onClick={() => setModal(false)}
                            className="modal-close"
                            icon={faTimes}
                            size="2x"
                        />
                    </div>
                    <input
                        placeholder="Username"
                        id="username"
                        name="username"
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                        className="modal-input"
                    />
                    <input
                        placeholder="Age"
                        id="age"
                        name="age"
                        type="text"
                        value={age || ""}
                        onChange={(e) => setAge(e.target.value)}
                        className="modal-input"
                    />
                    <input
                        placeholder="Gender"
                        id="gender"
                        name="gender"
                        type="text"
                        value={gender || ""}
                        onChange={(e) => setGender(e.target.value)}
                        className="modal-input"
                    />
                    <input
                        placeholder="Bio"
                        id="bio"
                        name="bio"
                        type="text"
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                        className="modal-input"
                    />
                    <input
                        placeholder="Location"
                        id="location"
                        name="location"
                        type="text"
                        value={location || ""}
                        onChange={(e) => setLocation(e.target.value)}
                        className="modal-input"
                    />
                    <input
                        placeholder="Website"
                        id="website"
                        name="website"
                        type="text"
                        value={website || ""}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="modal-input"
                    />
                    <Button className="update-button" onClick={update}>
                        Update
                    </Button>
                </div>
            )}
            <div className="following-followers-box">
                <div className="following-followers">
                    <h2 className="following-title">Following:</h2>
                    <div className="following-followers-container">
                        {user.user.following &&
                            user.user.following.map((a, key) => {
                                return (
                                    <Link
                                        className="following-followers-link"
                                        to={`/user/${a._id}`}
                                        key={key}
                                    >
                                        {a.image ? (
                                            <img
                                                className="following-followers-image"
                                                src={a.image}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="following-followers-image"
                                                src={noImg}
                                                alt=""
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
                <div className="following-followers">
                    <h2 className="following-title">Followers:</h2>
                    <div className="following-followers-container">
                        {user.user.followers &&
                            user.user.followers.map((a, key) => {
                                return (
                                    <Link
                                        className="following-followers-link"
                                        to={`/user/${a._id}`}
                                        key={key}
                                    >
                                        {a.image ? (
                                            <img
                                                className="following-followers-image"
                                                src={a.image}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="following-followers-image"
                                                src={noImg}
                                                alt=""
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="posts-container">
                {user.myPosts
                    .map((a, key) => {
                        return (
                            <div className="posts" key={key}>
                                <div className="post-box">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="delete"
                                        onClick={() =>
                                            props.deletePost({
                                                id: a._id,
                                            })
                                        }
                                    />
                                    {user.user.image ? (
                                        <img
                                            className="post-user-image"
                                            src={user.user.image}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className="post-user-image"
                                            src={noImg}
                                            alt=""
                                        />
                                    )}
                                    <div className="post-user-date">
                                        <p className="post-user">
                                            {user.user.username}
                                        </p>
                                        <p className="post-date">
                                            {dayjs(a.createdAt).fromNow(true)}{" "}
                                            ago
                                        </p>
                                    </div>
                                </div>
                                <p className="user-post">{a.post}</p>
                                <div className="post-bottom-buttons">
                                    <Button
                                        onClick={() =>
                                            props.like({
                                                id: a._id,
                                            })
                                        }
                                        className={
                                            a.likedBy.includes(user.user._id)
                                                ? "liked"
                                                : "like-button"
                                        }
                                    >
                                        {a.likes}
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className="heart-icon"
                                        />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            props.dislike({
                                                id: a._id,
                                            })
                                        }
                                        className={
                                            a.dislikedBy.includes(user.user._id)
                                                ? "disliked"
                                                : "dislike-button"
                                        }
                                    >
                                        {a.dislikes}
                                        <FontAwesomeIcon
                                            icon={faHeartBroken}
                                            className="heart-icon"
                                        />
                                    </Button>
                                    <Link
                                        to={`/post/${a._id}`}
                                        className="comment-button-link"
                                    >
                                        <Button className="comment-button">
                                            {a.commentCount}
                                            <FontAwesomeIcon
                                                icon={faCommentAlt}
                                                className="comment-icon"
                                            />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                    .reverse()}
            </div>
        </div>
    );
};

export default connect(null, {
    profile,
    like,
    dislike,
    deletePost,
    updateProfile,
    getMyPosts,
    logout,
})(Profile);
