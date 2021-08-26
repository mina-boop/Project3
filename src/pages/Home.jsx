import React, { Component } from "react";
import "../styles/Home.css";
import apiHandler from "../api/apiHandler";
import "bulma/css/bulma.css";
import Signin from "./Signin";
import FormComment from "../components/Forms/FormComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withUser } from "../components/Auth/withUser";


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
      // ta le current user grace au props du context 
      //donc tu peut faire this.props.context et la normalement ta ton user c'
        /* if(this.comment.creator._id===this.props.context.user._id){ */
          this.handleClick(memeId)
          
     /*      this.setState({
            comment:[],
           }); */
// le memeId il sert à retrouver le meme pas affiché tout les memes
        /* } */
     
      })
      .catch((e) => console.log(e));
  };

  handleClick = (id) => {
 // donc il faut vérifier que le current user soi différent du creator  ok
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
  // c'est cette fonction qui rafraichi les comments
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
    console.log(this.props)
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
                      onClick={() => {
                        this.handleClick(meme._id);
                      }}
                    >
                      <FontAwesomeIcon icon="chevron-down" />
                    </div>
                    <span className="button is-small" onClick={this.addComment}>
                      Comment
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
                        <div className="box" key={comment._id}>
                          <span>
                            {comment.text} posted by: {comment.creator.userName}
                          </span>
                        {this.props.context.user._id === comment.creator._i &&
          
                          <button
                            onClick={() =>
                              this.handleDelete(comment._id, meme._id)
                            }
                          >
                            Delete
                          </button>}
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
