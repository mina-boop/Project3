import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import "bulma/css/bulma.css";
import "../styles/profile.css";
import "../styles/Home.css";

class Profile extends Component {
  state = {
    meme: [],
    profile: {},
  };

  componentDidMount() {
    apiHandler
      .getUserMemes()
      .then((dbRes) => {
        this.setState({
          meme: dbRes,
        });
      })
      .catch((e) => console.log(e));
    apiHandler
      .getUserInfos()
      .then((res) => {
        this.setState({ profile: res });
      })
      .catch((e) => console.log(e));
  }

  handleDelete = (event) => {
    event.preventDefault();
    const id = event.target.id;
    apiHandler
      .deleteMemes(id)
      .then((memeId) => {
        this.setState({
          meme: memeId,
        });
        this.props.history.push("/profile", "/");
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="card">
            <div className="card-content">
              <div className="media-content">
                <div className="media-left">
                  <img className="profile-picture"
                    src={this.state.profile.profileImg}
                    alt={this.state.profile.userName}
                  />
                </div>
              </div>
              <div className="media-content">
                <p className="title is-3">{this.state.profile.userName}</p>
                <p className="subtitle is-6">{this.state.profile.city}</p>
                <p className="title is-6">{this.state.profile.email}</p>
                <p className="subtitle is-6">{this.state.profile.zodiacSign}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {this.state.meme.map((meme) => {
            return (
              <div className="card is-small">
                <div className="card-content" >
                  <div className="imgBox">
                    <img src={meme.memeimage} alt="" className="img" />
                    <span className="topText">{meme.caption1}</span>
                    <span className="bottomText">{meme.caption2}</span>
                  </div>
                  <button id={meme._id} className="button is-primary" onClick={this.handleDelete}>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withUser(Profile);
