import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Alert from "./Alert";
import JoblyApi from "./JoblyApi";

const Login = ({ setToken }) => {
  const history = useHistory();
  const [loginData, setLoginData] = useState(
    {
      username: "",
      password: "",
      errors: []
    });

  /** AUTHENTICATION:
   *  - generate token from backend and save in localStorage
   */
  const handleSubmit = async evt => {
    evt.preventDefault();
    let token;

    try {
      token = await JoblyApi.login({
        username: loginData.username,
        password: loginData.password
      });
    } catch (errors) {
      return setLoginData(loginData => ({ ...loginData, errors }));
    }

    setToken(token);
    history.push("/jobs");
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setLoginData(loginData => ({
      ...loginData,
      [name]: value
    }));
  };

  return (
    <div className="Login">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={loginData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
              {loginData.errors.length ? (
                <Alert type="danger" messages={loginData.errors} />
              ) : null}
              <Link className="btn btn-outline-primary float-left" to="/register">
                Create Account
              </Link>
              <button 
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;