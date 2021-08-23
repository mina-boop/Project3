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
        memeimage: "",
        name: "",
        search: "",
    };

    handleChange = (event) => {
        if (this.state.search !== "") {
            event.target = this.state.search
        }
        const key = event.target.name;
        const value = event.target.value;
        this.setState({ [key]: value });
    };

    handleClickImage = (event) => {
        event.preventDefault()
        const value = event.target.src;
        this.setState({ memeimage: value });
    };

    handleSearchValue = (event) => {
        this.setState({
            search: event,
        });
    };

    handleFileUpload = (event) => {
        this.setState({ memeimage: event.target.files[0] });
    }

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
        console.log(this.state)
        const filteredImage = Imagedb.filter((image) => {
            if (this.state.search === "") return false;
            return image.name.toLowerCase().includes(this.state.search.toLocaleLowerCase())
        });

        return (
            <div className="container">
                <form forHTML="meme" onSubmit={this.handleCreate}>
                    <h1 className="title">Meme's form !</h1>

                    <div>
                        <SearchBar
                            handleChange={this.handleSearchValue}
                            value={this.state.search}
                            onChange={this.handleOnChange}
                        />
                    </div>

                    <div className="box">
                        {filteredImage.map((image) => {
                            return (
                                <div className="box" key={image.name} onClick={this.handleClickImage}>
                                    <img className="image" src={image.image} alt="" />
                                </div>
                            );
                        })}
                    </div>

                    <div>
                        <label className="label" htmlFor="caption1">Caption 1 : </label>
                        <input
                            className="input"
                            type="text"
                            id="caption1"
                            name="caption1"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="caption2">Caption 2 : </label>
                        <input
                            className="input"
                            type="text"
                            id="caption2"
                            name="caption2"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="memeimage" action="/upload">
                            Meme: :{" "}
                        </label>
                        <input
                            className="input"
                            type="file"
                            id="memeimage"
                            name="memeimage"
                            onChange={this.handleFileUpload}
                        />
                    </div>
                    {this.state.memeimage && <div><input type="text" name="caption1" className="input" placeholder={this.state.caption1} /><img className="image" src={this.state.memeimage} alt="" /></div>}

                    <div>
                        <button className="button " type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FormMeme;
