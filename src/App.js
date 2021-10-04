import Deck from "./Deck";
import React from "react";
import Join from "./Join"
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
    <div className="outers">
      <Route path="/" exact component={Join} />
      <Route path="/deck" component={Deck} />
     
    </div>
    </Router>
   
  );
};

export default App;
