import React, { Component } from "react";
import "../styles/Home.css";
import apiHandler from "../api/apiHandler";
import 'bulma/css/bulma.css';
import Signin from "./Signin";


class Home extends Component {

  state = {
    memes: [],

  }


  componentDidMount() {
    console.log("here")
    apiHandler
      .getAllUsersMemes()
      .then((dbRes) => {
        console.log("dbRes here !!!!", dbRes)
        this.setState({
          memes: dbRes
        })
      })
      .catch((e) => console.log(e))
  }

  render() {


    return (
      <div>
        <div className="titlecolor">
          <h1>Feed :</h1></div>
        <Signin />
        <div className="container" >

          {this.state.memes.map((meme) => {

            return (
              <div key={meme.id} className="grid">
                <article className="box">
                  <p> posted by {meme.creator.userName} at {meme.createdAt}</p>
                  <img src={meme.memeimage} alt="" className="img" />
                  <span><img className="icon" src="../comment-icon.png" alt="icon-comment" /></span>
                  <span><img className="icon" src="../like-icon.png" alt="like-comment" /></span>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Home;
