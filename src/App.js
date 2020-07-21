import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddRegistro from "./components/add.component";
import List from "./components/list.component";
function App() {
  return (
    <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/registros" className="navbar-brand">
              CRUD EXAMPLE
            </a>
          </nav>
          
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/registros"]} component={List} />
              <Route exact path="/add" component={AddRegistro} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
