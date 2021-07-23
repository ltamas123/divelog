import { userLogin } from '../api/apiCalls';
import { useContext, useState } from 'react';
import { UserToken } from '../Hooks/UserToken';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { token, setToken } = useContext(UserToken);

  const loginPrep = async () => {
    const value = {
      username: email,
      password: pass,
    };
    await userLogin(value, { token, setToken });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <form>
            <div></div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label"
              ></label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={loginPrep}
            >
              Login
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Login;
