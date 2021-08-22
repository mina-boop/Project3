// import axios from "axios"; 
import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler';
import { UserContext } from "../Auth/UserContext";
import UserProvider from '../Auth/UserProvider';


class FormMeme extends Component {
    state = {
        creator: null,
        caption1: "",
        caption2: "",
        imageApi: "",
    }

    handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        console.log(this.state, UserProvider)
        this.setState({ [key]: value });
    };



    handleCreate = (event) => {
        event.preventDefault()
        const meme = {
            creator: this.state.creator,
            caption1: this.state.caption1,
            caption2: this.state.caption2,
            imageApi: this.state.imageApi,
        }
        apiHandler
            .postMemes(meme)
            .then((data) => {
                console.log(data)
                this.setState(...data);
            })
            .catch((error) => {
                console.log(error)
            });
    }


    render() {
        return (

            <form forHTML="meme" onSubmit={this.handleCreate}>
                <h1>Meme's form !</h1>

                <div>
                    <label htmlFor="searchMeme">Meme : </label>
                    <input type="text" id="searchMeme" name="searchMeme" onChange={this.handleChange} placeholder="Search meme" />
                </div>
                <div>
                    <label htmlFor="caption1">Text 1 : </label>
                    <input type="text" id="caption1" name="caption1" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="caption2">Text 2 : </label>
                    <input type="text" id="caption2" name="caption2" onChange={this.handleChange} />
                </div>

            
         
            <div>
                <label htmlFor="memeimage" action="/upload">Meme: : </label>
                <input type="file" id="memeimage" name="memeimage" onChange={this.handleFileChange}/>
            </div>
         <div>
             <input type="button" onClick={this.upload} value="Upload"/>
         </div>
                <div>
                    <label htmlFor="memeimage" >Meme: </label>
                    <input type="file" id="memeimage" name="imageApi" onChange={this.handleChange} />
                </div>
                <div>
                    <button type="button">Submit</button>
                </div>

            </form>
        )
    }
}

export default FormMeme

