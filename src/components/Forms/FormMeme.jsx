import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Imagedb from "../../data/Memedb.json";
import SearchBar from "./SearchBar";
import FeedBack from "../FeedBack";
import "../../styles/form.css"

import "../../styles/FormMeme.css"

class FormMeme extends Component {
    state = {
        caption1: "",
        caption2: "",
        memeimage: "",
        search: "",
        httpResponse: null,

    };
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value });
    };
    handleClickImage = (event) => {
        event.preventDefault()
        const value = event.target.src;
        this.setState({ memeimage: value, search: "" });

    };
    handleSearchValue = (event) => {
        this.setState({
            search: event,
        });
    };

    handleCreate = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append("memeimage", this.state.memeimage);
        fd.append("caption1", this.state.caption1);
        fd.append("caption2", this.state.caption2);
        apiHandler
            .postMemes(fd)
            .then(() => {
                this.setState({
                    httpResponse: {
                        status: "is-primary",
                        message: "Good job, meme added !",
                    },
                });
                setTimeout(() => { this.props.history.push("/") }, 2000)
            })
            .catch((error) => {
                this.setState({
                    httpResponse: {
                        status: "is-danger",
                        message: "Something bad happened while adding your meme, try again later",
                    },
                });
            });
    };

    render() {
        const filteredImage = Imagedb.filter((image) => {
            if (this.state.search === "") return false;
            return image.name.toLowerCase().includes(this.state.search.toLocaleLowerCase())
        });

        const { httpResponse } = this.state;

        return (
            <div className="container-form">
                <form className="field" onSubmit={this.handleCreate}>
                    <h1 className="title">Meme's form !</h1>
                    <SearchBar
                        handleChange={this.handleSearchValue}
                        value={this.state.search}
                        onChange={this.handleOnChange}
                    />
                    {filteredImage.map((image) => {
                        return (
                            <div className="box row" key={image.name} onClick={this.handleClickImage}>
                                <img className="image" src={image.image} alt="" />
                            </div>
                        );
                    })}
                    <div className="control">
                        <label className="label" htmlFor="caption1">Caption 1 : </label>
                        <input
                            className="input"
                            type="text"
                            id="caption1"
                            name="caption1"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="control">
                        <label className="label" htmlFor="caption2">Caption 2 : </label>
                        <input
                            className="input"
                            type="text"
                            id="caption2"
                            name="caption2"
                            onChange={this.handleChange}
                        />
                    </div>
                    {/*             <div className="control">
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
                    </div> */}
                    {this.state.memeimage &&
                        <div className="imgBox"><img className="image" src={this.state.memeimage} alt="" />
                            <span className="topText">{this.state.caption1}</span>
                            <span className="bottomText"> {this.state.caption2}</span>
                        </div>}
                    <div>
                        <button className="button is-primary is-fullwidth" type="submit">Submit</button>
                    </div>
                    {httpResponse && (
                        <FeedBack
                            message={httpResponse.message}
                            status={httpResponse.status}
                        />
                    )}
                </form>
            </div>
        );
    }
}
export default FormMeme;
