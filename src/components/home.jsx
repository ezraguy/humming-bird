import React, { Component } from "react";
import Pageheader from "./common/page-header";
import postService from "../services/postService";
import Post from "./common/post";
import PostSkeleton from "./common/skeleton";
import _ from "lodash";
import { toast } from "react-toastify";
class Home extends Component {
  state = { allPosts: [], isloading: true, isPostMine: false };
  posts = [];

  componentDidMount = async () => {
    let allPosts = [];
    const tempArr = await postService.getAllPosts();
    // the one true source
    this.posts = tempArr.data;
    //the copy
    allPosts = tempArr.data;
    allPosts = allPosts.reverse();
    this.setState({ allPosts });
    setTimeout(() => {
      this.setState({ isloading: false });
    }, 2000);
  };

  handleSearch = async (e) => {
    let filterdPosts = [...this.posts];
    let query = e.target.value;
    filterdPosts = _.filter(filterdPosts, (post) => {
      return post.tags.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });

    this.setState({ allPosts: filterdPosts });
  };

  addToFav = async (id) => {
    try {
      await postService.addToFav(id);
      toast.success("Post has been saved to favorites");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let { allPosts, isloading, isPostMine } = this.state;

    return (
      <React.Fragment>
        <Pageheader title="Home" />
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by tags"
              onChange={(e) => this.handleSearch(e)}
            />
          </div>
        </div>

        <div className="row">
          {allPosts.length > 0 &&
            !isloading &&
            allPosts.map((post) => (
              <Post
                key={post._id}
                post={post}
                addToFav={this.addToFav}
                isPostMine={isPostMine}
              />
            ))}
          {isloading && <PostSkeleton />}
        </div>
        {allPosts.length === 0 && (
          <p className="display-4">Its Quite in here... too quite..</p>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
