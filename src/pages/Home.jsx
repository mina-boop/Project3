import React, { Component } from "react";
import "../styles/Home.css";
import apiHandler from "../api/apiHandler";
import "bulma/css/bulma.css";
import Signin from "./Signin";
import FormComment from "../components/Forms/FormComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Home extends Component {
  state = {
    memes: [],
    memeId: null,
    comments: [],
    closeComment: false,
    addComment: false,
  };

  componentDidMount() {
    apiHandler
      .getAllUsersMemes()
      .then((dbRes) => {
        this.setState({
          memes: dbRes,
        });
      })
      .catch((e) => console.log(e));
  }

  handleDelete = (commentId, memeId) => {

    apiHandler
      .deleteComments(memeId, commentId)
      .then(() => {
  

     
      })
      .catch((e) => console.log(e));
  };

  handleClick = (id) => {
    if (id === this.state.memeId) {
      this.setState({ memeId: null, comments: [] });
    } else {
      this.setState({ memeId: id });
      apiHandler
        .getComments(id)
        .then((dbRes) => {
          console.log(dbRes);

          this.setState({
            comments: dbRes,
          });
        })
        .catch((e) => console.log(e));
    }
  };
  handleAddComment = (id) => {
    this.setState({ memeId: id, closeComment: false });
    apiHandler
      .getComments(id)
      .then((dbRes) => {
        this.setState({
          comments: dbRes,
        });
      })
      .catch((e) => console.log(e));
  };
  addComment = () => {
    this.setState({ addComment: !this.state.addComment });
  };
  render() {
    return (
      <div>
        <div className="titlecolor">
          <h1>Feed :</h1>
        </div>
        <Signin />

        <div className="container">
          {this.state.memes.map((meme) => {
            return (
              <div key={meme._id} className="grid">
                <article className="box">
                  <p>
                    {" "}
                    posted by {meme.creator.userName} at {meme.createdAt}
                  </p>
                  <div className="imgBox">
                    <img src={meme.memeimage} alt="" className="img" />

                    <span className="topText">{meme.caption1}</span>
                    <span className="bottomText">{meme.caption2}</span>
                  </div>
                  <div
                    className="button is-small"
                    onClick={() => {
                      this.handleClick(meme._id);
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-down" />
                  </div>
                  <span className="button is-small" onClick={this.addComment}>
                    Comment
                  </span>
                  {this.state.addComment && (
                    <FormComment
                      updateComments={this.handleAddComment}
                      memeById={meme._id}
                    />
                  )}
                  {this.state.memeId === meme._id &&
                    this.state.comments.map((comment) => {
                      return (
                        <div className="box" key={comment._id}>
                          <span>
                            {comment.text} posted by: {comment.creator.userName}
                          </span>
                          <button onClick={() => this.handleDelete(comment._id, meme._id)}>Delete</button>
                        </div>
                      );
                    })}
                  <span></span>
                  <span></span>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
