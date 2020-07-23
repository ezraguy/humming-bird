import React from "react";
import PageHeader from "./common/page-header";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import postService from "../services/postService";
import { toast } from "react-toastify";
class AddPost extends Form {
  constructor(props) {
    super(props);
    this.state = { data: { title: "", tags: "", img64: "" }, errors: {} };
  }

  schema = {
    title: Joi.string().min(2).max(255).required(),
    tags: Joi.string().min(2).max(255).required(),
    img64: Joi.string().min(11),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await postService.createPost(data);
    toast.success("Post has been created!");
    this.props.history.replace("/");
  };

  handleUpload = (e) => {
    const data = { ...this.state.data };
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      data["img64"] = reader.result;
      this.setState({ data });
    };
  };
  render() {
    return (
      <div>
        <PageHeader title="Add a new post" />
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              className="mt-4"
              autoComplete="off"
            >
              {this.renderInput("Title", "title")}
              {this.renderInput("Tags", "tags")}
              <input
                name="img64"
                onChange={(e) => this.handleUpload(e)}
                type="file"
                id="inp"
              />
              <br />
              <div className="mt-2">
                {this.renderButton("Post", "submit", "btn btn-primary ")}
                <Link to="/" className="btn btn-secondary ml-2">
                  cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddPost;
