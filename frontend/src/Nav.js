import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import TimeLine from './TimeLine';
import Login from './Login';

const Nav = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">DiveLog</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/">{token ? <TimeLine /> : <Login />}</Route>
        <Route path="/timeline">
          <TimeLine />
        </Route>
      </Switch>
    </Router>
  );
};

export default Nav;
