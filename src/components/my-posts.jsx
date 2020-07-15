import React, { Component } from "react";
import Pageheader from "./common/page-header";
import "../scss/post.scss";
import postService from "../services/postService";
import Post from "./common/post";
class MyPosts extends Component {
  state = { data: { email: "", password: "" }, errors: {}, myPosts: [] };

  componentDidMount = async () => {
    let myPosts = [...this.state.myPosts];
    let tempArr = await postService.getPosts();
    myPosts = tempArr.data;
    this.setState({ myPosts });
  };
  render() {
    const { myPosts } = this.state;
    return (
      <React.Fragment>
        <Pageheader title="My posts" />
        <div className="row  ">
          {myPosts.length > 0 &&
            myPosts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default MyPosts;
