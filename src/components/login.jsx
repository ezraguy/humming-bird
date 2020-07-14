import React, { Component } from "react";
import Pageheader from "./common/page-header";
import Form from "./common/form";
class Login extends Form {
  state = {};
  render() {
    return <Pageheader title="Login" />;
  }
}

export default Login;
