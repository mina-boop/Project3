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
        console.log("im here!", apiResponse.data.data.memes)
        this.setState({

          memes: apiResponse.data.data.memes,
        })
      })
      .catch((e) => console.log(e))
  }


  render() {
    console.log("haaaaallo!", this.state.memes)

    return (
      <div>
        <h1>Feed :</h1>

        <div className="container" >

          {this.state.memes.map((meme) => {

            return(
              <div key={meme.id}  className="grid">
              <article>
              <p>Posted by Toto at 6pm</p>
                <img src={meme.url} alt="" className="img"/>
              <button>like</button>
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
