import React, { useState } from "react";
import "./Post.sass";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { postPost } from "../../redux/actions/actions";
import { connect, useSelector } from "react-redux";

const Post = (props) => {
    const user = useSelector((state) => state.userReducer);

    const [post, setPost] = useState("");

    const postPost = (e) => {
        e.preventDefault();

        props.postPost(
            {
                post: post,
            },
            props.history
        );

        setPost("");
    };

    const disabled = post.length === 0 || post.length > 150;

    return (
        <div className="post-something">
            <textarea
                placeholder="Your post..."
                id="post"
                name="post"
                type="text"
                value={post}
                onChange={(e) => setPost(e.target.value)}
            />
            <Button onClick={postPost} disabled={disabled}>
                {user.loading ? (
                    <FontAwesomeIcon
                        className="post-spinner"
                        spin
                        icon={faSpinner}
                    />
                ) : (
                    "Post"
                )}
            </Button>
        </div>
    );
};

export default connect(null, {
    postPost,
})(Post);
