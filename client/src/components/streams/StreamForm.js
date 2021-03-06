import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui top pointing red basic label">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a valid Title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a valid Description";
  }
  return errors;
};

export default reduxForm({ form: "streamForm", validate })(StreamForm);
