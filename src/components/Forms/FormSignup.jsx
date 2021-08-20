import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then(() => {
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
      <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
        <h2>Signup</h2>
     
        <div>
        <label htmlFor="userName">User Name: </label>
        <input
          onChange={this.handleChange}
          value={this.state.userName}
          type="text"
          id="userName"
          name="userName"
        />
        </div>
        <div>
        <label htmlFor="password">Password: </label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        </div>
        <div>
        <label htmlFor="zodiacSign">Zodiac Sign: </label>
        <input
          onChange={this.handleChange}
          value={this.state.zodiacSign}
          type="text"
          id="zodiacSign"
          name="zodiacSign"
        />
        </div>
        <div>
        <label htmlFor="city">City: </label>
        <input
          onChange={this.handleChange}
          value={this.state.city}
          type="text"
          id="city"
          name="city"
        />
        </div>
        <div>
        <label htmlFor="profileImg" action="/upload">Profile Image: </label>
        <input
          onChange={this.handleChange}
          value={this.state.profileImg}
          type="file"
          id="profileImg"
          name="profileImg"
        />
        </div>
        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
