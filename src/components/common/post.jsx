import React from "react";
const Post = ({ post, handleDelete, isPostMine }) => {
  return (
    <div className="container postWrap">
      <div className="card">
        <img className="card-img-top" src={post.imgUrl} alt="post" />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.tags}</p>
          <p className="card-text">
            <small className="text-muted">{post._id}</small>

            {isPostMine && (
              <span
                className="fas fa-trash-alt ml-3"
                onClick={() => handleDelete(post._id)}
              ></span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
