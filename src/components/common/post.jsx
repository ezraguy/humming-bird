import React from "react";
const Post = ({ post }) => {
  return (
    <div className="container postWrap">
      <div className="card">
        <img className="card-img-top" src={post.imgUrl} alt="post Image" />
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.tags}</p>
          <p className="card-text">
            <small className="text-muted">{post._id}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
