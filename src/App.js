import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/UI/Navbar/Navbar";
import Detail from "./screens/Detail/Detail";
import Home from "./screens/Home/home";
import Footer from "./components/UI/Footer/Footer";
import Products from "./screens/Products/Products";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>{" "}
          <Route exact path="/categories">
            <Products />
          </Route>{" "}
          <Route exact path="/info">
            {" "}
            {/* component */}{" "}
          </Route>{" "}
          <Route exact path="/product">
            <Detail />
          </Route>{" "}
        </Switch>{" "}
        <Footer />
      </div>{" "}
    </Router>
  );
}

export default App;
