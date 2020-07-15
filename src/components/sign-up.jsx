import React from "react";
import Pageheader from "./common/page-header";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { apiUrl } from "../config.json";

class SignUp extends Form {
  state = { data: { name: "", email: "", password: "" }, errors: {} };
  schema = {
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    try {
      await http.post(`${apiUrl}/users`, data);
    } catch (err) {
      console.log("oops...");
    }
  };
  render() {
    return (
      <div>
        <Pageheader title="Sign Up" />
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              className="mt-4"
              autoComplete="off"
            >
              {this.renderInput("Your Name", "name")}
              {this.renderInput("Email", "email", "email")}
              {this.renderInput("Password", "password", "password")}
              {this.renderButton("Sign Up", "submit", "btn btn-primary")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
