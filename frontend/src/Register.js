import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Alert from "./Alert";
import JoblyApi from "./JoblyApi";

const Register = ({ setToken }) => {
  const history = useHistory();
  const [registerData, setRegisterData] = useState(
    {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      errors: []
    });

  /** AUTHENTICATION:
   *  - get token from backend and save in localStorage
   */
  const handleSubmit = async evt => {
    evt.preventDefault();

    // pass in undefined for optional fields
    let data = {
      username: registerData.username,
      password: registerData.password,
      first_name: registerData.first_name || undefined,
      last_name: registerData.last_name || undefined,
      email: registerData.email || undefined
    }

    let token;

    try {
      token = await JoblyApi.register(data);
    } catch (errors) {
      return setRegisterData(registerData => ({ ...registerData, errors }));
    }

    setToken(token);
    history.push("/jobs");
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    setRegisterData(registerData => ({
      ...registerData,
      [name]: value
    }));
  };

  return (
    <div className="Register">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={registerData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={registerData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="form-group">
                  <label>First name</label>
                  <input
                    name="first_name"
                    className="form-control"
                    value={registerData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    name="last_name"
                    className="form-control"
                    value={registerData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={registerData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {registerData.errors.length ? (
                <Alert type="danger" messages={registerData.errors} />
              ) : null}
              <Link className="btn btn-outline-primary float-left" to="/login">
                Login
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

export default Register;