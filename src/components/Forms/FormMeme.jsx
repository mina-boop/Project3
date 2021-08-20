// import axios from "axios"; 
import React, { Component } from 'react'

class FormMeme extends Component {
    state = {
        creator: "",
        caption1: "",
        caption2: "",
        imageApi:"",
      }

      handleFileChange = e => {
        this.setState({ fimageApiile: e.target.files[0] });
        console.log("im here:", e.target.files)
      };

      handleChange = e => {
        this.setState({ text: e.target.value });
        
      };

    handleCreate = (event) => {
        

    }

    // upload = () => {
    //     // if (this.state.file) {
    //     //   let data = new FormData();
    //     //   data.append("file", this.state.file);
    //     //   data.set("data", this.state.text);
    
    //       axios
    //         .get("https://api.imgflip.com/get_memes")
    //         .then((apiResponse)=>{
    //             console.log("apiRes:", apiResponse.data)

    //             this.setState({

    //                 imageApi : apiResponse.data.memes
    //             })
    //         })
    //         .catch(error => console.log(error));
        
    //   };
    
    
    
      render() {
    
          return(
              
            <form forHTML="meme" onSubmit={this.handleCreate}>
            <h1>Meme's form !</h1>

            <div>
                <label htmlFor="searchMeme">Meme : </label>
                <input type="text" id="searchMeme" name="searchMeme" onChange={this.handleChange} placeholder="Search meme" value="{this.state.}"/>
            </div>
            <div>
                <label htmlFor="caption1">Text 1 : </label>
                <input type="text" id="caption1" name="caption1" onChange={this.handleChange}/>
            </div>
            <div>
                <label htmlFor="caption2">Text 2 : </label>
                <input type="text" id="caption2" name="caption2" onChange={this.handleChange}/>
            </div>
         
            <div>
                <label htmlFor="memeimage" action="/upload">Meme: : </label>
                <input type="file" id="memeimage" name="memeimage" onChange={this.handleFileChange}/>
            </div>
         <div>
             <input type="button" onClick={this.upload} value="Upload"/>
         </div>

            </form>
          )
          
      
    }
}

export default FormMeme

