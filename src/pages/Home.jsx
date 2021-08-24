import React, { Component, createFactory } from "react";
import "../styles/Home.css";
import apiHandler from "../api/apiHandler";
import FormSignin from "../components/Forms/FormSignin"
import 'bulma/css/bulma.css';


class Home extends Component {

  state = {
    memes: [],
    showModal: true
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
        {this.state.showModal && <div class="modal ">
          <div class="modal-background"></div>
          <div class="modal-content">
            <FormSignin />
          </div>
          <button class="modal-close is-large" aria-label="close"></button>
        </div>}
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
