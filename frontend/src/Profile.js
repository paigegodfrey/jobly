import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "./UserContext";
import JoblyApi from "./JoblyApi";
import Alert from "./Alert";

const Profile = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    first_name: currentUser.first_name || "",
    last_name: currentUser.last_name || "",
    email: currentUser.email || "",
    photo_url: currentUser.photo_url || "",
    password: "",
    errors: [],
    saveConfirmed: false
  });

  const handleSubmit = async evt => {
    evt.preventDefault();

    try {
      // pass in undefined for optional fields
      let profileData = {
        first_name: userForm.first_name || undefined,
        last_name: userForm.last_name || undefined,
        email: userForm.email || undefined,
        photo_url: userForm.photo_url || undefined,
        password: userForm.password
      };

      let username = currentUser.username;
      let updatedUser = await JoblyApi.saveProfile(username, profileData);

      setUserForm(fData => ({
        ...fData,
        errors: [],
        saveConfirmed: true,
        password: ""
      }))
      setCurrentUser(updatedUser);
    } catch (errors) {
      setUserForm(f => ({ ...f, errors }));
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setUserForm(fData => ({
      ...fData,
      [name]: value,
      errors: []
    }));
  };

  const cancel = () => {
    history.goBack();
  }

  return (
    <div className="Profile">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="first_name"
                  className="form-control"
                  value={userForm.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="last_name"
                  className="form-control"
                  value={userForm.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  className="form-control"
                  value={userForm.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Photo URL</label>
                <input
                  name="photo_url"
                  className="form-control"
                  value={userForm.photo_url}
                  onChange={handleChange}
                />
              </div>
              {userForm.errors.length ? (
                <Alert type="danger" messages={userForm.errors} />
              ) : null}
              {userForm.saveConfirmed ? (
                <Alert type="success" messages={["User updated successfully."]} />
              ) : null}
              <div className="form-group">
                <label>Confirm password to make changes:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={userForm.password}
                  onChange={handleChange}
                />
              </div>
              <div onClick={cancel} className="btn btn-outline-primary float-left">
                Cancel
              </div>
              <button onSubmit={handleSubmit} className="btn btn-primary float-right">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;