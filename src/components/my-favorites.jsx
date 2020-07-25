import React, { Component } from "react";
import Pageheader from "./common/page-header";
import postService from "../services/postService";
import Post from "./common/post";
import PostSkeleton from "./common/skeleton";

class MyFavorites extends Component {
  state = { myFavorites: [], isloading: true };

  componentDidMount = async () => {
    let myFavorites = [...this.state.myFavorites];
    let tempArr = await postService.getFavorites();
    myFavorites = tempArr.data;
    this.setState({ myFavorites });
    setTimeout(() => {
      this.setState({ isloading: false });
    }, 2000);
  };

  render() {
    const { myFavorites, isloading } = this.state;
    return (
      <React.Fragment>
        <Pageheader title="My favorites" />

        <div className="row">
          {myFavorites.length > 0 &&
            !isloading &&
            myFavorites.map((post) => <Post key={post._id} post={post} />)}
          {isloading && <PostSkeleton />}
          {myFavorites.length === 0 && (
            <div className="container">
              <p>you have no favorites</p>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default MyFavorites;
