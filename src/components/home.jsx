import React, { Component } from "react";
import Pageheader from "./common/page-header";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Pageheader title="Home" />;
  }
}

export default Home;
