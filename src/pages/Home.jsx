import React, { Component } from "react";
import "../styles/Home.css";
import apiHandler from "../api/apiHandler";
import "bulma/css/bulma.css";
import Signin from "./Signin";
import FormComment from "../components/Forms/FormComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withUser } from "../components/Auth/withUser";
import FeedBack from "../components/FeedBack";

class Home extends Component {
  state = {
    memes: [],
    memeId: null,
    comments: [],
    closeComment: false,
    addComment: false,
    httpResponse: null,

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

        this.setState({
          httpResponse: {
            status: "is-danger",
            message: "Comment deleted!",
          },
        });
        setTimeout(() => {
          this.getComments(memeId);

          this.setState({
            httpResponse: null
          });
        }, 1000)

      })
      .catch((e) => console.log(e));
  };

  handleClick = (id) => {
    if (id === this.state.memeId) {
      this.setState({ memeId: null });
    } else {
      this.setState({ memeId: id });
      this.getComments(id);
    }
  };
  // function that refreshes comments
  handleAddComment = (id) => {
    this.setState({ memeId: id, closeComment: false, addComment: false });
    this.setState({
      httpResponse: {
        status: "is-primary",
        message: "Comment added!",
      },
    });
    setTimeout(() => {
      this.setState({
        httpResponse: null
      });
      this.getComments(id);
    }, 1000)

  };

  getComments(id) {
    apiHandler
      .getComments(id)
      .then((dbRes) => {
        this.setState({
          comments: dbRes,
          closeComment: true,
        });
      })
      .catch((e) => console.log(e));
  }

  addComment = () => {
    this.setState({ addComment: !this.state.addComment });
  };
  render() {
    const { httpResponse } = this.state;

    return (
      <div>
        <div className="titlecolor ">
          <h1>New & Fresh</h1>
        </div>
        <Signin />
        {httpResponse && (
          <FeedBack
            message={httpResponse.message}
            status={httpResponse.status}
          />
        )}
        <div className="container">

          {this.state.memes.map((meme) => {
            return (
              <div key={meme._id} className="grid">
                <article className="box">
                  <p>
                    {" "}
                    posted by {meme.creator.userName} on{" "}
                    {new Date(meme.createdAt).toLocaleDateString("en", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="imgBox">
                    <img src={meme.memeimage} alt="" className="img" />
                    <span className="topText">{meme.caption1}</span>
                    <span className="bottomText">{meme.caption2}</span>
                  </div>
                  <span>
                    <div
                      className="button is-small"
                      onClick={() => this.handleClick(meme._id)}
                    >
                      <FontAwesomeIcon icon="list" size="2x" />
                    </div>
                    <span className="button is-small" onClick={this.addComment}>
                      <FontAwesomeIcon icon="comment-dots" size="2x" />
                    </span>
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
                        <div className="content is-small" >
                          <div key={comment._id}>
                            <span>
                              {comment.text} <i>posted by:</i> {comment.creator.userName}

                              {this.props.context.user._id ===
                                comment.creator._id && (
                                  <button
                                    className="delete is-small"
                                    onClick={() =>
                                      this.handleDelete(comment._id, meme._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                )}</span>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withUser(Home);
