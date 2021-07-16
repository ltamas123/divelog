import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TimeLine from './TimeLine';
import Login from './Login';
import { UserToken } from '../UserToken';
import { Logout } from './Logout';
import useDecode from '../Hooks/useDecode';
import ProfilePage from './ProfilePage';
const Nav = () => {
  const [token, setToken] = useState();
  const { getUserId } = useDecode();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const isUserLogdIn = token ? <TimeLine /> : <Login />;

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <h5 className="navbar-brand">DiveLog</h5>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/timeline">TimeLine</Link>
              </li>
              <li className="nav-item">
                {token ? (
                  <Link to="/logout"> Logout</Link>
                ) : (
                  <Link to="/login"> Login</Link>
                )}
              </li>
              {token && (
                <li className="nav-item">
                  <Link to={`/user/${getUserId()}`}>Profile</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <UserToken.Provider value={{ token, setToken }}>
        <Switch>
          <Route path={`/user/`}>
            <ProfilePage />
          </Route>
          <Route path="/timeline">{isUserLogdIn}</Route>
          <Route path="/login">{isUserLogdIn}</Route>
          <Route path="/logout">{token ? <Logout /> : <Login />}</Route> TODO
          valamit kitalálni rá hogy logout után ne maradjon a logout path-on
          <Route exact path="/">
            {isUserLogdIn}
          </Route>
        </Switch>
      </UserToken.Provider>
    </Router>
  );
};

export default Nav;
