import React, { Component } from "react";
import { withRouter, Redirect, NavLink } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import 'bulma/css/bulma.css';
import FeedBack from "../FeedBack";




class FormSignin extends Component {
  state = {
    email: "",
    password: "",
    httpResponse: null,

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
        this.setState({
          httpResponse: {
            status: "is-primary",
            message: "Welcome",
          },
        });
        setTimeout(() => { this.props.context.setUser(data); }, 1000)

      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "is-danger",
            message: "Oh no! your not found here, please try again",
          },
        });
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }
    const { httpResponse } = this.state;

    return (
      <div>
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head"><h2 className="title">Signin</h2></header>
            <div className="modal-card-body">
              <form className="container-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>

                {httpResponse && (
                  <FeedBack
                    message={httpResponse.message}
                    status={httpResponse.status}
                  />
                )}
                <label className="label" htmlFor="email">Email</label>
                <div className="control">
                  <input className="input" type="email" id="email" name="email" />
                </div>
                <label className="label" htmlFor="password">Password</label>
                <input className="input" type="password" id="password" name="password" />
                <button className="button is-primary is-fullwidth">Submit</button>
              </form>
            </div>
            <div className="modal-card-foot">
              <NavLink exact to="/signup">Create profile</NavLink></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withUser(FormSignin));
