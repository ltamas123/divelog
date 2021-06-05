import axios from 'axios';
import { useEffect, useState } from 'react';

const Login = () => {
  const [jwt, setJwt] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function userLogin() {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username: username,
        password: password,
      });
      console.log(response);
      setJwt(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" class="btn btn-primary" onClick={userLogin}>
        Submit
      </button>
    </form>
  );
};

export default Login;
