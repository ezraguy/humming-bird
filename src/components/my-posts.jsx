import React, { Component } from "react";
import Pageheader from "./common/page-header";
import "../scss/post.scss";
import postService from "../services/postService";
import Post from "./common/post";
import PostSkeleton from "./common/skeleton";
import _ from "lodash";
import Swal from "sweetalert2";
import { swalConfig } from "../config.json";
class MyPosts extends Component {
  state = {
    myPosts: [],
    isloding: true,
    isPostMine: true,
  };

  componentDidMount = async () => {
    let myPosts = [...this.state.myPosts];
    let tempArr = await postService.getPosts();
    myPosts = tempArr.data;
    setTimeout(() => {
      this.setState({ myPosts, isloding: false });
    }, 2000);
  };

  handleDelete = async (id) => {
    let { myPosts } = this.state;
    Swal.fire(swalConfig).then((result) => {
      if (result.value) {
        let tempArr = _.filter(myPosts, function (o) {
          return o._id !== id;
        });
        myPosts = tempArr;
        this.setState({ myPosts });
        this.deletePost(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  deletePost = async (id) => {
    await postService.deletePost(id);
  };

  render() {
    const { myPosts, isloding, isPostMine } = this.state;
    return (
      <React.Fragment>
        <Pageheader title="My posts" />

        <div className="row">
          {myPosts.length > 0 &&
            !isloding &&
            myPosts.map((post) => (
              <Post
                key={post._id}
                post={post}
                handleDelete={this.handleDelete}
                isPostMine={isPostMine}
              />
            ))}
          {isloding && <PostSkeleton />}
          {myPosts.length === 0 && (
            <div className="container">
              <p>you have no posts... yet</p>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default MyPosts;
