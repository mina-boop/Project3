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
<<<<<<< HEAD
        <h1>Feed :</h1>
=======
        <h1>All your memes here !</h1>
>>>>>>> 9336aa661697f4b7d9f741ac54ee99c97daabfc8

        <div className="container" >

          {this.state.memes.map((meme)=>{

            return(
<<<<<<< HEAD
              <div key={meme.id}  className="grid">
              <article>
              <p>Posted by Toto at 6pm</p>
                <img src={meme.url} alt="" className="img"/>
=======
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
>>>>>>> 9336aa661697f4b7d9f741ac54ee99c97daabfc8
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
