import { userLogin, getUserId } from './apiCalls';
import { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import TimeLine from './TimeLine';
import { UserToken } from './UserToken';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { token, setToken } = useContext(UserToken);

  let history = useHistory();

  const loginPrep = async () => {
    const value = {
      username: email,
      password: pass,
    };

    await userLogin(value, { token, setToken });

    history.push('/timeline');
  };

  token && localStorage.removeItem('token');

  return (
    <form>
      <div></div>
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

      <button type="button" class="btn btn-primary" onClick={loginPrep}>
        Login
      </button>
    </form>
  );
};

export default Login;
