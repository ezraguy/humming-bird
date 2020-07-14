import React, { Component } from "react";
import Input from "./inputs";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  //checks the entire form
  validateForm() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;
    //code below runs if there are no errors
    this.doSubmit();
  };

  //checks each input
  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    //if there is an error return the message of the error and if not return null
    return error ? error.details[0].message : null;
  }

  //adds the fieds name as aproperty to data variable, assignes the value and updates the state
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    //sends the input to the validateProperty function and gets back the error message if there are errors
    const errorMessage = this.validateProperty(input);
    //if there is value in error message so insert to errors object the input name(the field name) and the value of the errror message we get form Joi
    if (errorMessage) errors[input.name] = errorMessage;
    //if there is no error go and delete the the inputs messages so in ui the error message will not be displayed
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(label, name, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        type={type}
        label={label}
        name={name}
        error={errors[name]}
        value={data[name]}
      />
    );
  }

  renderButton(text, type, className) {
    return (
      <button disabled={this.validateForm()} type={type} className={className}>
        {text}
      </button>
    );
  }
}

export default Form;
