import React, { useState, useEffect, useContext } from 'react';
import UserContext from "./UserContext";
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import ProfileForm from "./ProfileForm";
import { PropagateLoader } from "react-spinners";
import defaultPic from "./default-pic.png";
import './Profile.css';

const Profile = () => {
  const { currentUser } = useContext(UserContext);

  const [jobApps, setJobApps] = useState([]);
  const [jobAppsLoaded, setJobAppsLoaded] = useState(false);

  const loadJobApps = async () => {
    let jobsResponse = await JoblyApi.getApplications();
    setJobApps(jobsResponse);
    setJobAppsLoaded(true);
  }

  useEffect(() => {
    loadJobApps();
  }, []);

  const [showForm, setShowForm] = useState(false);

  const toggleFormButton = () => {
    setShowForm(!showForm);
  }

  if (!currentUser || !jobAppsLoaded) {
    return (
      <div className="fade-loader-container d-flex align-items-center justify-content-center" style={{ height: '50vh' }}>
        <PropagateLoader size='15px' color="#123abc" />
      </div>
    );
  }

  const showDetails = (
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
          <p><b>First Name: </b>{currentUser.first_name ? currentUser.first_name : "N/A"}</p>
          <p><b>Last Name: </b>{currentUser.last_name ? currentUser.last_name : "N/A"}</p>
          <p><b>Email: </b>{currentUser.email ? currentUser.email : "N/A"}</p>
          <p><b>Photo URL: </b>{currentUser.photo_url ? currentUser.photo_url : "N/A"}</p>
        </div>
      </div>
    </div>
  );

  const editDetails = (
    <div className="user-details col-lg-5 px-5">
      <div className="text-center">
        <div className="mb-3">
          <img className="profile-pic" src={currentUser.photo_url || defaultPic} alt={`${currentUser.name} profile pic`}></img>
        </div>
        <hr></hr>
      </div>
      <ProfileForm toggleFormButton={toggleFormButton} />
    </div>
  );

  return (
    <div className="d-flex">
      <div className="container">
        <div className="row">
          {showForm ? editDetails : showDetails}
          <div className="col-lg-7 px-5">
            <h1 className="mt-5" >Job Applications</h1>
            <div className="mt-5">
              {jobApps.length ? (
                <div className="JobList row row-cols-2">
                  {jobApps.map((jobData, idx) => (
                    <JobCard
                      job={jobData}
                      key={jobData.id}
                    />
                  ))}
                </div>
              ) : (
                  <p className="lead">No outstanding job applications</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;