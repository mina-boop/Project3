import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import Imagedb from "../../data/Memedb.json";
import SearchBar from "./SearchBar";
import "../../styles/form.css";


<SearchBar />;

class FormMeme extends Component {
    state = {
        caption1: "",
        caption2: "",
        memeimage: "",
        search: "",
    };

    handleChange = (event) => {
        const { value, name } = event.target
        /*         if (this.state.search !== "") {
                    event.target = this.state.search
                } */
        this.setState({ [name]: value });
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
    /* 
        handleFileUpload = (event) => {
            this.setState({ memeimage: event.target.files[0] });
        } */

    handleCreate = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append("memeimage", this.state.memeimage);
        fd.append("caption1", this.state.caption1);
        fd.append("caption2", this.state.caption2);

        apiHandler
            .postMemes(fd)
            .then(() => {
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
            <div className="container-form">
                <form className="field" forHTML="meme" onSubmit={this.handleCreate}>
                    <h1 className="title">Meme's form !</h1>

                    <div>
                        <SearchBar
               handleChange={this.handleSearchValue}
                            value={this.state.search}
                            onChange={this.handleOnChange}
                        />
                    </div>

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

                    <div className="control">
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
                    {this.state.memeimage &&
                        <div className="control"><input type="text" id="caption1" className="input" placeholder={this.state.caption1} /><img className="image" src={this.state.memeimage} alt="" />
                            <input type="text" id="caption2" className="input" placeholder={this.state.caption2} /></div>}

                    <div>
                        <button className="button " type="submit">Submit</button>
                    </div>
                
                </form>
            </div>
        );
    }
}

export default FormMeme;
