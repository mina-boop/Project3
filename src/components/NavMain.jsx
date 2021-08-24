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
          <img id="main-logo"className="image" src="../memeLogo.png" alt="" />
        </NavLink>

        <a role="button"  className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
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

              <NavLink to="/profile">
                {context.user && context.user.email}
              </NavLink>

              <button className="button" onClick={handleLogout}>Logout</button>

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
