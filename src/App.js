import React from "react";
import "./App.css";
import Landing from "./Component/Landing/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import { useStateValue } from "./Component/StateProvider";
import HomePage from "./Component/HomePage/HomePage";
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="App">
      <Router>
        <Switch>
          {!user ? (
            <>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route exact path="/">
                <Landing></Landing>
              </Route>
            </>
          ) : (
            <>
              <Route path="/">
                <HomePage></HomePage>
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
