import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import 'bulma/css/bulma.css';



class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form className="container-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <h2 className="title">Signin</h2>
        <label className="label" htmlFor="email">Email</label>
        <div className="control">
          <input className="input" type="email" id="email" name="email" />
        </div>
        <label className="label" htmlFor="password">Password</label>
        <input className="input" type="password" id="password" name="password" />
        <button className="button is-primary is-fullwidth">Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignin));
