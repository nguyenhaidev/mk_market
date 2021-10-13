import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/UI/Navbar/Navbar";
import Home from "./screens/Home/home";
import Footer from "./components/UI/Footer/Footer";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/store">{/* component */}</Route>
          <Route path="/info">{/* component */}</Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
