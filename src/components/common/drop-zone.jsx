import React, { Component } from "react";
import { log, resolve, read } from "joi-browser";
import { reject } from "lodash";

class DropZone extends Component {
  state = { img64: "" };
  dropStyle = {
    margin: "20px",
    height: "200px",
    fontSize: "20pt",
    textAlign: "center",
    borderStyle: "dashed",
    borderRadius: "10px",
  };

  handleUpload = (e) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => console.log(reader.result);
  };

  render() {
    return (
      <input onChange={(e) => this.handleUpload(e)} type="file" id="inp" />
    );
  }
}

export default DropZone;
