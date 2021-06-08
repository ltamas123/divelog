import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import TimeLine from './TimeLine';
import Login from './Login';
import { UserToken, UserId } from './UserToken';
const Nav = () => {
  const [token, setToken] = useState();
  //const [userId, setUserId] = useState();

  useState(() => {
    setToken(localStorage.getItem('token'));
  }, []);

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
                <Link to="/login">{token ? 'Logout' : 'Login'}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <UserToken.Provider value={{ token, setToken }}>
        <Switch>
          <Route path="/timeline">
            <TimeLine />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            {token ? <TimeLine /> : <Login />}
          </Route>
        </Switch>
      </UserToken.Provider>
    </Router>
  );
};

export default Nav;
