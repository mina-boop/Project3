import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormMeme from "./components/Forms/FormMeme"
import 'bulma/css/bulma.css';
import Settings from "./pages/Settings";




function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/memeform" component={FormMeme}/>
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/settings" component={Settings} />
      </Switch>
    </div>
  );
}

export default App;
