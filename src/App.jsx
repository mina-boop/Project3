import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Logout from './pages/Logout'
import FormMeme from "./components/Forms/FormMeme";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faList, faCommentDots, faUser, faHashtag, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bulma/css/bulma.css';
import Settings from "./pages/Settings";


library.add(faHome, faList, faCommentDots, faUser, faHashtag, faSignOutAlt)


function App() {

  return (
    <div className="App">
      <NavMain />
      <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/memeform" component={FormMeme} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={Logout} />

        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/settings" component={Settings} />
      </Switch>
    </div>
  );
}

export default App;
