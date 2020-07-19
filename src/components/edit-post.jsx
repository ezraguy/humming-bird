import React from "react";
import Form from "./common/form";
import PageHeader from "./common/page-header";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import postService from "../services/postService";
class EditPost extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      tags: "",
      img64: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(2).max(255).required(),
    tags: Joi.string().min(2).max(1024).required(),
    img64: Joi.string().min(11),
  };

  componentDidMount = async () => {
    const postId = this.props.match.params.id;
    const { data } = await postService.getOnePost(postId);
    //delting the the fileds that dont match the scheme (that we got from mongo)
    delete data.__v;
    delete data.user_id;
    this.setState({ data });
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await postService.editPost(data);
    toast.success("Post has been Updated!");
    this.props.history.replace("/my-posts");
  };

  render() {
    return (
      <div className="container">
        <PageHeader title="Edit Card" />
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              className="mt-4"
              autoComplete="off"
            >
              {this.renderInput("title", "title")}
              {this.renderInput("tags", "tags")}
              {this.renderButton("Update Post", "submit", "btn btn-primary ")}
              <Link to="/my-posts" className="btn btn-secondary ml-2 ">
                cancel
              </Link>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
