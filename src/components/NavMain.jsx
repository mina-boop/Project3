import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink exact to="/" >
          <img id="main-logo" className="image" src="../memeLogo.png" alt="" />
        </NavLink>

        <NavLink role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" to="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </NavLink>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink exact to="/" className="navbar-item">
            Home
          </NavLink>
        </div>

        <div className="navbar-end">
          {context.isLoggedIn && (
            <React.Fragment>
              <div className="navbar-item">
                <div className="buttons">
                  <NavLink exact to="/profile"><div className="button is-light">My profile</div></NavLink>
                  {context.user && <NavLink exact to="/memeform"><div className="button is-primary" >Create meme</div></NavLink>}
                  <button className="button is-info" onClick={handleLogout}>Logout</button></div></div>
            </React.Fragment>
          )}
          {!context.isLoggedIn && (
            <React.Fragment>
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-light"> <NavLink to="/signin">Log in</NavLink></a>

                  <button className="button is-primary">
                    <NavLink to="/signup">Create account</NavLink>
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav >

  );
};

export default withUser(NavMain);
