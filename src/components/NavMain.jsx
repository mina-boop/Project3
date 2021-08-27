import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logout from "../pages/Logout"

const NavMain = (props) => {
  const { context } = props;

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
              <NavLink exact to="/" className="navbar-item">
                <FontAwesomeIcon icon="home" /><div>Home</div>
              </NavLink>

              <NavLink exact to="/profile" className="navbar-item">
                <FontAwesomeIcon icon="user" /><div>Profile</div></NavLink>
              {context.user &&
                <NavLink exact to="/memeform" className="navbar-item"><FontAwesomeIcon icon="hashtag" /><div>Create a meme</div></NavLink>
              }
              <NavLink exact to="/logout" className="navbar-item">
                <FontAwesomeIcon icon="sign-out-alt" onClick={() => <Logout user={context} />} /><div>Logout</div>
              </NavLink>
            </React.Fragment>
          )}

        </div>
      </div>
    </nav >

  );
};

export default withUser(NavMain);
