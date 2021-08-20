import axios from "axios";
import React, { Component } from 'react'

class FormMeme extends Component {
    state = {
        creator: "",
        caption1: "",
        caption2: "",
      }

      handleChange = (event) =>{
          this.setState({
              
          })

      }

      handleCreate = (event) => {

      }

      this.setState({})
    
    
    
      render() {
    
          
                <form forHTML="meme" onSubmit={this.handleCreate}>
                <h1>Meme's form !</h1>
                <div>
                    <label htmlFor="caption1">Text 1 : </label>
                    <input type="text" id="caption1" name="caption1"/>
                </div>
                <div>
                    <label htmlFor="caption2">Text 2 : </label>
                    <input type="text" id="caption2" name="caption2"/>
                </div>
                <div>
                    <label htmlFor="memeimage" action="/upload">Meme: : </label>
                    <input type="file" id="memeimage" name="memeimage"/>
                </div>
                <button>Create my Meme</button>

                </form>
          
        
    }
}

export default FormMeme

