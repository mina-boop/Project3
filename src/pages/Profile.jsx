import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withUser } from "../components/Auth/withUser";

class Profile extends Component {
  handleDelete = (event) => {
    console.log("Delete");
  };
  handleUpdate=(event)=>{
      console.log("Update")
  }
  render() {
    const { context } = this.props;
    const { user } = context;
    console.log(user);
    return (
      <div>
        <h2>Welcome {user.userName}</h2>

        <section className="Profile">
          <div>
            <img src={user.profileImg} alt={user.userName} />
          </div>
          <div className="user-presentation">
            <h2>{user.userName}</h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          <div className="Memes">
            <h3>Your memes</h3>
            <div className="meme">
              <div className="round-image">
                <img src="https://i.imgur.com/VzEhqoJ.jpg" alt="" />
              </div>

              <div className="buttons">
                <span>
                  <button className="btn-secondary" onClick={this.handleDelete}>
                    Delete
                  </button>
                </span>
                <span>
                  <button className="btn-primary" onClick={this.handleUpdate}>
                    Edit
                  </button>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
