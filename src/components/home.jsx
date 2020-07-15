import React, { Component } from "react";
import Pageheader from "./common/page-header";
import postService from "../services/postService";
import Post from "./common/post";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { allPosts: [] };
  }

  componentDidMount = async () => {
    const tempArr = await postService.getAllPosts();
    let allPosts = tempArr.data;
    allPosts = allPosts.reverse();
    this.setState({ allPosts });
  };
  render() {
    const { allPosts } = this.state;
    return (
      <React.Fragment>
        <Pageheader title="Home" />

        <div className="row">
          {allPosts.length > 0 &&
            allPosts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
