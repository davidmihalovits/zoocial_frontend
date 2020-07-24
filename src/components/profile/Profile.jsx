import React, { useState, useEffect } from "react";
import "./Profile.sass";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
    profile,
    like,
    dislike,
    deletePost,
    updateProfile,
    getMyPosts,
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
    }, [props]);

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
            <div className="user">
                <h1>{user.user.username}</h1>
                {user.user.image ? (
                    <div>
                        <input
                            style={{ display: "none" }}
                            name="image"
                            id="image"
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            value={""}
                            onChange={imageOnChange}
                        />
                        <label htmlFor="image">
                            <img
                                src={user.user.image}
                                alt="profile pic"
                                className={loading ? "loading-image" : null}
                            />
                        </label>
                    </div>
                ) : (
                    <div>
                        <input
                            style={{ display: "none" }}
                            name="image"
                            id="image"
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            value={""}
                            onChange={imageOnChange}
                        />
                        <label htmlFor="image">
                            <img
                                src={noImg}
                                alt="no profile pic"
                                className={loading ? "loading-image" : null}
                            />
                        </label>
                    </div>
                )}
                <p className="bio">{user.user.bio}</p>
                <div className="user-details">
                    <p>{user.user.age}</p>
                    <p>{user.user.gender}</p>
                    <p>{user.user.location}</p>
                    <p>
                        <a
                            href={user.user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {user.user.website}
                        </a>
                    </p>
                    <p>Member for {dayjs(user.user.createdAt).fromNow(true)}</p>
                </div>
                <Button
                    className="edit-button"
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
                {modal && (
                    <div className="modal">
                        <FontAwesomeIcon
                            onClick={() => setModal(false)}
                            className="close"
                            icon={faTimes}
                        />
                        <input
                            placeholder={"Username"}
                            id="username"
                            name="username"
                            type="text"
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            placeholder={"Age"}
                            id="age"
                            name="age"
                            type="text"
                            value={age || ""}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <input
                            placeholder={"Gender"}
                            id="gender"
                            name="gender"
                            type="text"
                            value={gender || ""}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <input
                            placeholder={"Bio"}
                            id="bio"
                            name="bio"
                            type="text"
                            value={bio || ""}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <input
                            placeholder={"Location"}
                            id="location"
                            name="location"
                            type="text"
                            value={location || ""}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <input
                            placeholder={"Website"}
                            id="website"
                            name="website"
                            type="text"
                            value={website || ""}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        <Button onClick={update}>Update</Button>
                    </div>
                )}

                <div className="following">
                    <p>Following:</p>
                    <div>
                        {user.user.following &&
                            user.user.following.map((a, key) => {
                                return (
                                    <Link to={`/user/${a._id}`} key={key}>
                                        {a.image ? (
                                            <img src={a.image} alt="" />
                                        ) : (
                                            <img src={noImg} alt="" />
                                        )}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
                <div className="followers">
                    <p>Followers:</p>
                    <div>
                        {user.user.followers &&
                            user.user.followers.map((a, key) => {
                                return (
                                    <Link to={`/user/${a._id}`} key={key}>
                                        {a.image ? (
                                            <img src={a.image} alt="" />
                                        ) : (
                                            <img src={noImg} alt="" />
                                        )}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
                <hr />
                {user.loading ? (
                    <FontAwesomeIcon
                        spin
                        icon={faSpinner}
                        className="spinner"
                    />
                ) : (
                    <div className="posts">
                        {user.posts
                            .map((a, key) => {
                                return (
                                    <div className="post" key={key}>
                                        <div className="post-date">
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="delete"
                                                onClick={() =>
                                                    props.deletePost({
                                                        id: a._id,
                                                    })
                                                }
                                            />
                                            <p style={{ fontSize: "18px" }}>
                                                {a.post}
                                            </p>
                                            <div
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
                                            </div>
                                        </div>
                                        <div className="post-bottom-buttons">
                                            <Button
                                                onClick={() =>
                                                    props.like({
                                                        id: a._id,
                                                    })
                                                }
                                                className={
                                                    a.likedBy.includes(
                                                        user.user._id
                                                    )
                                                        ? "liked"
                                                        : "like-button"
                                                }
                                            >
                                                {a.likes}
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    props.dislike({
                                                        id: a._id,
                                                    })
                                                }
                                                className={
                                                    a.dislikedBy.includes(
                                                        user.user._id
                                                    )
                                                        ? "disliked"
                                                        : "dislike-button"
                                                }
                                            >
                                                {a.dislikes}
                                                <FontAwesomeIcon
                                                    icon={faHeartBroken}
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                />
                                            </Button>
                                            <Link to={`/post/${a._id}`}>
                                                <Button className="comment-button">
                                                    {a.commentCount}
                                                    <FontAwesomeIcon
                                                        icon={faCommentAlt}
                                                        style={{
                                                            marginLeft: "10px",
                                                        }}
                                                    />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                            .reverse()}
                    </div>
                )}
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
})(withRouter(Profile));
