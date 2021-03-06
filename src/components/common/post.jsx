import React from "react";
import { Link } from "react-router-dom";
const Post = ({ post, handleDelete, isPostMine, addToFav }) => {
  return (
    <div className="container postWrap">
      <div className="card">
        <img className="card-img-top" typeof="" src={post.img64} alt="post" />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.tags}</p>
          <div className="card-text">
            <small className="text-muted">
              {post.user_id.name.toUpperCase()}
            </small>

            {isPostMine === true && (
              <div>
                <i
                  className="fas fa-trash-alt ml-2 mr-2"
                  onClick={() => handleDelete(post._id)}
                ></i>
                <Link to={`/my-posts/edit/${post._id}`}>
                  <i className="far fa-edit"></i>
                </Link>
              </div>
            )}

            {isPostMine === false && (
              <i
                className="far fa-heart ml-2"
                onClick={() => addToFav(post._id)}
              ></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
