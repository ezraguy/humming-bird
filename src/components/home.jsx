import React, { Component } from "react";
import Pageheader from "./common/page-header";
import postService from "../services/postService";
import Post from "./common/post";
import PostSkeleton from "./common/skeleton";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { allPosts: [], isloading: true };
  }

  componentDidMount = async () => {
    const tempArr = await postService.getAllPosts();
    let allPosts = tempArr.data;
    allPosts = allPosts.reverse();
    this.setState({ allPosts });
    setTimeout(() => {
      this.setState({ isloading: false });
    }, 2000);
  };
  render() {
    const { allPosts, isloading } = this.state;
    return (
      <React.Fragment>
        <Pageheader title="Home" />
        <div className="row">
          {allPosts.length > 0 &&
            !isloading &&
            allPosts.map((post) => <Post key={post._id} post={post} />)}
          {isloading && <PostSkeleton />}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
