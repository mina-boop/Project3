import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";


class FormComment extends Component {
    state = {
        comment: "",
    };

    handleChange = (event) => {
        this.setState({ comment: event.target.value });
    };


    handleSubmit = (event) => {
        event.preventDefault();

        apiHandler
            .postComment(this.props.memeById, this.state)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        console.log(this.state)
        return (
            <form className="field has-addons" onSubmit={this.handleSubmit}>
                <p className="control">
                    <span className="button is-small"> <input
                        className="input is-small"
                        type="text"
                        id="comment"
                        name="comment"
                        onChange={this.handleChange}
                    /></span>

                </p>
                <p className="control">
                    <span><button className="button is-small">Add</button></span>
                </p>
            </form >
        );
    }
}

export default FormComment;
