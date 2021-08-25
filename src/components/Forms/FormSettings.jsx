import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import "bulma/css/bulma.css";
import apiHandler from "../../api/apiHandler";

class FormSettings extends Component {
  state = {
    email: "",
    password: "",
    userName: "",
    zodiacSign: "",
    city: "",
    profileImg: "",
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    apiHandler
      .getUserInfos(id)
      .then((userInfos) => {
        console.log(userInfos);
        const data = userInfos;

        this.setState({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    console.log("here", event.target.value);
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleFile = (event) => {
    this.setState({
      profileImg: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("profileImg", this.state.profileImg);
    fd.append("email", this.state.email);
    fd.append("userName", this.state.userName);
    fd.append("password", this.state.password);
    fd.append("zodiacSign", this.state.zodiacSign);
    fd.append("city", this.state.city);
    const id = this.props.match.params.id;
    
    apiHandler
      .PatchUserInfos(fd, id)
      .then((userInfosRes) => {
        console.log(userInfosRes);
        this.setState({ ...userInfosRes.data});
        
        this.props.history.push("/profile");
        
       
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("submit", event);
  };

  render() {
    console.log(this.state);

    return (
      <div className="card">
        <div className="card-content">
          <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
            <h2>Edit your infos here</h2>

            <div className="field">
              <label htmlFor="userName" className="label">
                User Name:
              </label>
              <div className="control has-icons-left">
                <input
                  onChange={this.handleChange}
                  value={this.state.userName}
                  type="text"
                  id="userName"
                  name="userName"
                  className="input"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label htmlFor="email" className="label">
                Email:
              </label>
              <div className="control has-icons-left">
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  type="text"
                  id="email"
                  name="email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <label htmlFor="password" className="label">
                  Password:
                </label>

                <input
                  onChange={this.handleChange}
                  value={this.state.password}
                  type="password"
                  id="password"
                  name="password"
                  className="input"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <label htmlFor="zodiacSign" className="label">
                Zodiac Sign:
              </label>
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
              <label htmlFor="city" className="label">
                City:
              </label>
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
              <label htmlFor="profileImg" action="/upload" className="label">
                Profile Image:
              </label>
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
            <button>Submit</button>
           
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withUser(FormSettings));
