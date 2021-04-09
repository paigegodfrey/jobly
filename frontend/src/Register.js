import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Alert from "./Alert";

const Register = ({ register }) => {
  const history = useHistory();
  const [registerData, setRegisterData] = useState(
    {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
    });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async evt => {
    evt.preventDefault();
    let result = await register(registerData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
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
            <h3 className="card-title text-center mb-4">Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control form-control-sm"
                  value={registerData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-sm"
                  value={registerData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="form-group">
                  <label>First name</label>
                  <input
                    name="first_name"
                    className="form-control form-control-sm"
                    value={registerData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    name="last_name"
                    className="form-control form-control-sm"
                    value={registerData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm"
                    value={registerData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
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