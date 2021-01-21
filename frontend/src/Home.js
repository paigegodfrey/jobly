import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import headerImg from "./you-x-ventures-X8H8vPcelPk-unsplash.jpg";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="Home d-flex align-items-center" style={{ height: '50vh' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div>
              <img src={headerImg} className="img-fluid" alt="Jobly" />
            </div>
          </div>
          <div className="col-md-5 ml-auto mt-4 mt-md-0">
            <div>
              <h1>Jobly</h1>
              <p className="lead">All the jobs in one, convenient place.</p>
              {currentUser ? (
                <h2>Welcome back{currentUser.first_name ? `, ${currentUser.first_name}!` : '!'}</h2>
              ) : (
                <div>
                  <Link className="btn btn-primary font-weight-bold" to="/register">
                    Get Started
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