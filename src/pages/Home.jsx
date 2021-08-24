import React, { Component } from "react";
import axios from "axios"
import "../styles/Home.css";

class Home extends Component {

  state = {
    memes: [],
  }

  componentDidMount() {

    axios.get("https://api.imgflip.com/get_memes")
      .then((apiResponse) => {
      
        this.setState({

          memes: apiResponse.data.data.memes,
        })
      })
      .catch((e) => console.log(e))
  }


  render() {
  

    return (
      <div>
        <div className="titlecolor">
          <h1>Feed :</h1></div>

        <div className="container" >

          {this.state.memes.map((meme) => {

            return(
              <div key={meme.id}  className="grid">
              <article className="box">
              <p>Posted by Toto at 6pm</p>
                <img src={meme.url} alt="" className="img"/>
              <span><img className="icon" src="../comment-icon.png" alt="icon-comment"/></span>
              <span><img className="icon" src="../like-icon.png" alt="like-comment"/></span>
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
