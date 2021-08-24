// import axios from "axios";
import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
// import { UserContext } from "../Auth/UserContext";
// import UserProvider from '../Auth/UserProvider';
import Imagedb from "../../data/Memedb.json";
import SearchBar from "./SearchBar";

<SearchBar />;

class FormMeme extends Component {
  state = {
    caption1: "",
    caption2: "",
    image: "",
    name: "",
    search: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  handleSearchValue = (event) => {
    console.log("target value !!!!!!", event);

    this.setState({
      search: event,
    });
  };

  handleCreate = (event) => {
    event.preventDefault();
    const meme = {
      caption1: this.state.caption1,
      caption2: this.state.caption2,
      imageApi: this.state.imageApi,
    };

    apiHandler
      .postMemes(meme)
      .then((data) => {
        console.log("here", data);
        this.setState(...data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const filteredImage = Imagedb.filter((image) => { 


      if(this.state.search === "") return false;
       return image.name.toLowerCase().includes(this.state.search.toLocaleLowerCase())
    });

    return (
      <form forHTML="meme" onSubmit={this.handleCreate}>
        <h1>Meme's form !</h1>

        <div>
          <SearchBar
            handleChange={this.handleSearchValue}
            value={this.state.search}
            onChange = {this.handleOnChange}
          />
        </div>

        <div className="box">
          {filteredImage.map((image) => {
            return (
              <div className="box">
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src={image.image} alt="" />
                    </figure>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div>
          <label htmlFor="caption1">Text 1 : </label>
          <input
            type="text"
            id="caption1"
            name="caption1"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="caption2">Text 2 : </label>
          <input
            type="text"
            id="caption2"
            name="caption2"
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="memeimage" action="/upload">
            Meme: :{" "}
          </label>
          <input
            type="file"
            id="memeimage"
            name="memeimage"
            onChange={this.handleFileChange}
          />
        </div>
        <div>
          <input type="button" onClick={this.upload} value="Upload" />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default FormMeme;
