import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Alert from "./Alert";

const Login = ({ login }) => {
  const history = useHistory();
  const [loginData, setLoginData] = useState(
    {
      username: "",
      password: "",
    });

  const [loginErrors, setLoginErrors] = useState([]);

  const handleSubmit = async evt => {
    evt.preventDefault();
    let result = await login(loginData);
    if (result.success) {
      history.push("/companies");
    } else {
      setLoginErrors(result.errors);
    }
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
            <h3 className="card-title text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control form-control-sm"
                  value={loginData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-sm"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
              {loginErrors.length ? (
                <Alert type="danger" messages={loginErrors} />
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