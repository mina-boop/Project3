import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import 'bulma/css/bulma.css';
import "../styles/Home.css";


class Profile extends Component {
  state = {
    meme: [],
  };

  componentDidMount() {
    apiHandler
    .getUserMemes()
    .then((dbRes)=>{
      console.log("dbRes here !!!!", dbRes)  
      this.setState({
       meme  : dbRes
      })
      .catch((e) => console.log(e));
  }

  handleDelete = (event) => {
    console.log("Delete");
  }; 
  handleUpdate = (event) => {
    console.log("Update");
  };
  render() {
    
    const { context } = this.props;
    const { user } = context;
    console.log(user.profileImg);
    return (
      <div className="profile-container">
        <h2>Welcome {user.userName}</h2>

        <section className="profile">
          <div>
          <figure className="image is-128x128">
            <img src={user.profileImg} alt={user.userName} />
          </figure>

          </div>
          <div className="user-presentation">
            <h2>{user.userName}</h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          <div className="memes">
            <h3>Your memes</h3>
            <div className="meme">
            <div className="container">
            {this.state.meme.map((meme)=>{
              
              return(
                 <div className="grid">
                  <article className="box">
                   <p>Posted </p>
                   <img src={meme.memeimage} alt="" />
                  </article>
                  </div>
              )
            })}
            </div>



              <div className="buttons">
                <span>
                  <button className="btn-secondary">Delete</button>
                </span>
                <span>
                  <button className="btn-primary">Edit</button>
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
