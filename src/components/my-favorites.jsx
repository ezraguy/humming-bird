import React, { Component } from "react";
import Pageheader from "./common/page-header";
import postService from "../services/postService";
import Post from "./common/post";
class MyFavorites extends Component {
  state = { myFavorites: [] };

  componentDidMount = async () => {
    let myFavorites = [...this.state.myFavorites];
    let tempArr = await postService.getFavorites();
    myFavorites = tempArr.data;
    console.log(myFavorites);
    this.setState({ myFavorites });
  };
  render() {
    const { myFavorites } = this.state;
    return (
      <React.Fragment>
        <Pageheader title="My favorites" />

        <div className="row">
          {myFavorites.length > 0 &&
            // !isloding &&
            myFavorites.map((post) => (
              <Post
                key={post._id}
                post={post}
                // isPostMine={isPostMine}
              />
            ))}
          {/* {isloding && <PostSkeleton />} */}
        </div>
      </React.Fragment>
    );
  }
}

export default MyFavorites;
