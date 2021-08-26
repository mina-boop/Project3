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
        console.log(event.target.value);
        if (event.key === 'Enter') {

            event.preventDefault();
            apiHandler
                .postComment(this.props.memeById, this.state)
                .then(() => {
                    this.props.updateComments(this.props.memeById);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    render() {

        return (

            <form className="has-addons" onKeyPress={this.handleSubmit}>
                <div className="control">
                    <span>
                        {" "}
                        <input
                            className="input is-small"
                            type="text"
                            name="comment"
                            onChange={this.handleChange}
                            placeholder="Add a comment..."
                            required
                        />
                    </span>
                </div>
            </form>
        );
    }
}

export default FormComment;
