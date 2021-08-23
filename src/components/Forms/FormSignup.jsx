import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

import 'bulma/css/bulma.css';


class FormSignup extends Component {
  state = {
    email: "",
    password: "",
    userName: "",
    profileImg: "",
    zodiacSign: "",
    city: ""
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
      .then((test) => {
        console.log("apiHandler", test)
        this.props.history.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (

      <div className="card">
        <div className="card-content">


          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <h2>Signup</h2>

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
                type="text"
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
            <button className="button">Submit</button>
          </form>
        </div>

      </div>

    );
  }
}

export default withRouter(withUser(FormSignup));
