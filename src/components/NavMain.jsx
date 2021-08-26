import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
        this.props.history.push('/')
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
        <div className="navbar-end">

          {context.isLoggedIn && (
            <React.Fragment>
              <div className="navbar-item">
                <NavLink exact to="/" className="navbar-item">
                  <FontAwesomeIcon icon="home" ></FontAwesomeIcon>
                </NavLink>
              </div>
              <div className="navbar-item">
                <NavLink exact to="/profile">
                  <FontAwesomeIcon icon="user" /></NavLink>
              </div>
              {context.user &&
                <div className="navbar-item">
                  <NavLink exact to="/memeform"><FontAwesomeIcon icon="hashtag" /></NavLink>
                </div>
              }
              <div className="navbar-item">
                <div ><FontAwesomeIcon icon="sign-out-alt" onClick={handleLogout} /></div>
              </div>
            </React.Fragment>
          )}

        </div>
      </div>
    </nav >

  );
};

export default withUser(NavMain);
