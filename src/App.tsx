import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Activate from "./components/Activate";
import ResetPassword from "./components/ResetPassword";

import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/activate">
          <Activate />
        </Route>
        <Route path="/reset">
          <ResetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
