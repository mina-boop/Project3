import React, { Component } from "react";
import "../styles/Home.css";
import apiHandler from "../api/apiHandler";
import 'bulma/css/bulma.css';
import Signin from "./Signin";
import Signup from "./Signup";
import FormComment from "../components/Forms/FormComment";


class Home extends Component {

  state = {
    memes: [],
    comment: [],
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
              <div key={meme._id} className="grid">
                <article className="box">
                  <p> posted by {meme.creator.userName} at {meme.createdAt}</p>
                  <img src={meme.memeimage} alt="" className="img" />
                  {/*        <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                        <label className="label is-small">Comments :</label>
                        <span class="icon is-small">
                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                      <div class="dropdown-content">
                        <div class="dropdown-item">
                          {meme.comment}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <p>{ }</p>
                  <span><img className="icon" src="../comment-icon.png" alt="icon-comment" /><FormComment memeById={meme._id} /></span>
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
