import React, { Component } from "react";
import { withRouter, Redirect, NavLink } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

import "bulma/css/bulma.css";

class FormSignup extends Component {
  state = {
    email: "",
    password: "",
    userName: "",
    profileImg: "",
    zodiacSign: "",
    city: "",
    httpResponse: null,

  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleFile = event => {
    this.setState({
      profileImg: event.target.files[0]
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("profileImg", this.state.profileImg);
    fd.append("email", this.state.email);
    fd.append("userName", this.state.userName);
    fd.append("password", this.state.password);
    fd.append("zodiacSign", this.state.zodiacSign);
    fd.append("city", this.state.city);

    apiHandler.signup(fd)
      .then(() => {
        this.setState({
          httpResponse: {
            status: "is-primary",
            message: "Profile created !",
          },
        });
        setTimeout(() => { this.props.history.push("/"); }, 2000)


      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "is-danger",
            message: "Something bad happened while updating your signup, try again later",
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
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head"><h2 className="title">Signup</h2></header>
          <div className="modal-card-body">
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              {httpResponse && (
                <FeedBack
                  message={httpResponse.message}
                  status={httpResponse.status}
                />
              )}
              <div className="field">
                <label htmlFor="userName" className="label">User Name: </label>
                <div className="control has-icons-left">
                  <input
                    onChange={this.handleChange}
                    value={this.state.userName}
                    type="text"
                    id="userName"
                    name="userName"
                    className="input"
                  />
                  <span className="icon is-small is-left"><i className="fas fa-user"></i></span>

                </div>
              </div>

              <div className="field">

                <label htmlFor="email" className="label"> Email: </label>
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                />
                <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <label htmlFor="password" className="label">Password: </label>

                  <input
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    id="password"
                    name="password"
                    className="input"
                  />
                  <span className="icon is-small is-left"> <i className="fas fa-lock"></i> </span>
                </p>

              </div>

              <div className="field">
                <label htmlFor="zodiacSign" className="label">Zodiac Sign: </label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    value={this.state.zodiacSign}
                    type="text"
                    id="zodiacSign"
                    name="zodiacSign"
                    className="input"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="city" className="label">City: </label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    value={this.state.city}
                    type="text"
                    id="city"
                    name="city"
                    className="input"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="profileImg" action="/upload" className="label">Profile Image: </label>
                <div className="control">
                  <input
                    onChange={this.handleFile}
                    type="file"
                    id="profileImg"
                    name="profileImg"
                    className="input"
                  />
                </div>
              </div>
              <button className="button is-primary is-fullwidth">Submit</button>

            </form>
          </div>     <div className="modal-card-foot">
            <NavLink exact to="/signin">Signin</NavLink></div>
        </div>
      </div >

    );
  }
}

export default withRouter(withUser(FormSignup));
