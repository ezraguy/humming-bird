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

    this.state = { data: { title: "", tags: "", imgUrl: "" }, errors: {} };
  }

  schema = {
    title: Joi.string().min(2).max(255).required(),
    tags: Joi.string().min(2).max(255).required(),
    imgUrl: Joi.string().min(11).max(1024).uri(),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await postService.createPost(data);
    toast.success("Card has been created!");
    this.props.history.replace("/");
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
              {this.renderInput("Image Url", "imgUrl")}
              {this.renderButton("Post", "submit", "btn btn-primary ")}
              <Link to="/" className="btn btn-secondary ml-2">
                cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddPost;
