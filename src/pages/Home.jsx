import React from "react";
import axios from "axios"
import "../styles/Home.css";

class Home extends React.Component {

  state = {
    memes : [],
  }

  componentDidMount(){

    axios.get("https://api.imgflip.com/get_memes")
    .then((apiResponse)=>{
      console.log("im here!", apiResponse.data.data.memes)
      this.setState({
       
        memes : apiResponse.data.data.memes,
      })
    })
    .catch((e)=>console.log(e))
  }


  render() {
    console.log("haaaaallo!",this.state.memes)

    return (
      <div>
        <h1>All your memes here !</h1>

        <div className="container" >

          {this.state.memes.map((meme)=>{

            return(
              <div class="memes" key={meme.id}>
              <li>
                <img style={{width:150, height:150}}
                src={meme.url} 
                alt=""/>
              <div>
                <label for="text">Comment:</label>
                <br></br>
                <textarea id="msg" name="user_message"></textarea>
              </div>  
              <button>like</button>
              </li>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Home;
