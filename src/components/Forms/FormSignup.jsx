import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

import 'bulma/css/bulma.css';


class FormSignup extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then(() => {
        this.props.history.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (

      <div className="card">
      <div className="card-content">


      <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
        <h2>Signup</h2>

        <div className="field">
       
        <label htmlFor="userName" class="label">User Name: </label>
        <div className="control has-icons-left">
        <input
          onChange={this.handleChange}
          value={this.state.userName}
          type="text"
          id="userName"
          name="userName"
          className="input"
        />
        <span className="icon is-small is-left"><i className="fas fa-user"></i></span>

        </div>
        </div>

        <div className="field">
        <p className="control has-icons-left">
        <label htmlFor="password" className="label">Password: </label>
        
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
          className="input"
        />
         <span className="icon is-small is-left"> <i className="fas fa-lock"></i> </span>
         </p>
    
        </div>

        <div className="field">
        <label htmlFor="zodiacSign" className="label">Zodiac Sign: </label>
        <div className="control">
        <input
          onChange={this.handleChange}
          value={this.state.zodiacSign}
          type="text"
          id="zodiacSign"
          name="zodiacSign"
          className="input"
        />
        </div>
        </div>

        <div className="field">
        <label htmlFor="city" class="label">City: </label>
        <div className="control">
        <input
          onChange={this.handleChange}
          value={this.state.city}
          type="text"
          id="city"
          name="city"
          className="input"
        />
        </div>
        </div>
        
        <div className="field">
        <label htmlFor="profileImg" action="/upload" className="label">Profile Image: </label>
        <div className="control">
        <input
          onChange={this.handleChange}
          value={this.state.profileImg}
          type="file"
          id="profileImg"
          name="profileImg"
          className="input"
        />
        </div>
        </div>
        <button>Submit</button>
      </form>
      </div> 

      </div>
     
    );
  }
}

export default withRouter(withUser(FormSignup));
