import React from "react";
import Pageheader from "./common/page-header";
import Form from "./common/form";
import Joi from "joi-browser";
import userService from "../services/userService";
import { toast } from "react-toastify";

class SignUp extends Form {
  state = { data: { email: "", password: "" }, errors: {} };
  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    try {
      await userService.login(data.email, data.password);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: err.response.data } });
        toast.error(err.response.data);
      }
    }
  };
  render() {
    return (
      <div>
        <Pageheader title="Sign In" />
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              className="mt-4"
              autoComplete="off"
            >
              {this.renderInput("Email", "email", "email")}
              {this.renderInput("Password", "password", "password")}
              {this.renderButton("Login", "submit", "btn btn-primary")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
