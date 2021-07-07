import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Activate from "./components/Activate";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/NotFound";
import Main from "./components/Main";
import CarMake from "./components/CarMake";
import CarReviews from "./components/CarReviews";
import CarReview from "./components/CarReview";

import "./App.scss";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = AuthService.getCurrentUser();
    if (token) {
      setUser(true);
      return;
    }
  }, [user]);

  return (
    <Router>
      {!user ? (
        <Switch>
          <Route exact path={["/", "/login"]}>
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/activate">
            <Activate />
          </Route>
          <Route exact path="/forgot">
            <ForgotPassword />
          </Route>
          <Route exact path="/reset">
            <ResetPassword />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path={["/", "/main"]}>
            <Main />
          </Route>
          <Route exact path="/cars/:make/all">
            <CarMake />
          </Route>
          <Route exact path="/cars/:make/:model">
            <CarReviews />
          </Route>
          <Route exact path="/cars/:make/:model/:id">
            <CarReview />
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default App;
