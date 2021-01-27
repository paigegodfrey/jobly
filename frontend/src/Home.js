import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import headerImg from "./you-x-ventures-X8H8vPcelPk-unsplash.jpg";
import './Home.css';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div id="hero" className="Home d-flex">
      <div className="container hero-container">
        <div className="row">
          <div className="col-lg-7">
            <div>
              <img className="img-fluid" src={headerImg} alt="jobly" />
            </div>
          </div>
          <div className="title-text-col d-flex align-items-center col-lg-5 mt-4 mt-lg-0 ml-auto">
            <div>
              <h1>Jobly</h1>
              <p className="lead">All the jobs in one, convenient place.</p>
              {!currentUser ? (
                <div>
                  <Link className="btn btn-secondary font-weight-bold" to="/register">
                    Get Started
                  </Link>
                </div>
              ) : (
                  <div>
                    <Link className="btn btn-outline-secondary font-weight-bold" to="/jobs">
                      View Jobs
                  </Link>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;