import { userLogin } from './apiCalls';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TimeLine from './TimeLine';

const Login = () => {
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const loginPrep = () => {
    const value = {
      username: email,
      password: pass,
    };

    userLogin(value);
  };

  return (
    <Router>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"></label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <Link to="/timeline">
          <button type="button" class="btn btn-primary" onClick={loginPrep}>
            Login
          </button>
        </Link>
      </form>
    </Router>
  );
};

export default Login;
