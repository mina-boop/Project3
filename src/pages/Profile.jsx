import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import "bulma/css/bulma.css";
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
      <div className="profile-container">
        <h2>Welcome {this.state.profile.userName}</h2>

        <section className="profile">
          <div>
            
              <img className="profileimg"
                src={this.state.profile.profileImg}
                alt={this.state.profile.userName}
              />
           
          </div>
          <div className="user-presentation">
            
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          <div className="memes">
            <h3>My memes</h3>
            <div className="meme">
              <div className="container">
                {this.state.meme.map((meme) => {
                  return (
                    <div className="grid">
                      <article className="box" key={meme._id}>
                        <p>Posted </p>
                        <img src={meme.memeimage} alt="" />
                        <div className="buttons">
                          <span>
                            <button
                              id={meme._id}
                              className="btn-secondary"
                              onClick={this.handleDelete}
                            >
                              Delete
                            </button>
                          </span>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
