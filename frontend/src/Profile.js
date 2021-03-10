import React, { useState, useContext } from 'react';
import UserContext from "./UserContext";
import Applications from './Applications';
import ProfileForm from "./ProfileForm";
import { PropagateLoader } from "react-spinners";
import defaultPic from "./default-pic.png";
import './Profile.css';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const userJobs = currentUser.jobs;

  const [showForm, setShowForm] = useState(false);

  const toggleFormButton = () => {
    setShowForm(!showForm);
  }

  if (!currentUser) {
    return (
      <div className="fade-loader-container d-flex align-items-center justify-content-center" style={{ height: '50vh' }}>
        <PropagateLoader size='15px' color="#123abc" />
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="d-flex">
        <div className="container">
          <div className="row">
            <div className="user-details col-lg-5 px-5">

              <div className="text-center">
                <div className="mb-3">
                  <img className="profile-pic" src={currentUser.photo_url || defaultPic} alt={`${currentUser.name} profile pic`}></img>
                </div>
                <div>
                  <button className="btn btn-outline-primary" onClick={toggleFormButton}>Edit Details</button>
                </div>
                <hr></hr>
              </div>

              <div className="card mb-2">
                <div className="card-body">
                <p><b>First Name: </b>{currentUser.first_name}</p>
                <p><b>Last Name: </b>{currentUser.last_name}</p>
                <p><b>Email: </b>{currentUser.email}</p>
                <p><b>Photo URL: </b>{currentUser.photo_url}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-7 px-5">
              <h1 className="mt-5" >Job Applications</h1>
              <div className="mt-5">
                <Applications userJobs={userJobs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProfileForm toggleFormButton={toggleFormButton} />
    </div>
  )
}

export default Profile;