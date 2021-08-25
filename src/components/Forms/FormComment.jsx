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
            .then(() => {

                this.props.updateComments()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <form className="has-addons" onSubmit={this.handleSubmit}>
                <div className="control">
                    <span>  <input
                        className="input is-small"
                        type="text"
                        name="comment"
                        onChange={this.handleChange}
                        required
                    />
                        <button className="button is-small">Add</button></span>
                </div>
            </form >
        );
    }
}

export default FormComment;
