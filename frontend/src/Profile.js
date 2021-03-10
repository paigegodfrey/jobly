import React, { useState, useContext } from 'react';
import UserContext from "./UserContext";
import Applications from './Applications';
import ProfileForm from "./ProfileForm";
import { PropagateLoader } from "react-spinners";
import defaultPic from "./default-pic.png";
import './Profile.css';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
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
            <div className="user-details col-lg-4">
              <div>
                <img className="profile-pic" src={currentUser.photo_url || defaultPic} alt={`${currentUser.name} profile pic`}></img>
                <hr></hr>
              </div>
              <div className="mb-5">
                <p><b>Username: </b>{currentUser.username}</p>
                <p><b>Name: </b>{`${currentUser.first_name} ${currentUser.last_name}`}</p>
                <p><b>Email: </b>{currentUser.email} </p>
                <button className="btn btn-outline-primary" onClick={toggleFormButton}>Edit Info</button>
              </div>
            </div>
            <div className="col-lg-8">
              <h1 className="mt-5" >Outstanding job applications:</h1>
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