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
        <h1>All your memes here !</h1>

        <div className="container" >

          {this.state.memes.map((meme) => {

            return (
              <div key={meme.id} className="grid">
                <article>
                  <p>Posted by Toto at 6pm</p>
                  <img src={meme.url} alt="" className="img" />
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
