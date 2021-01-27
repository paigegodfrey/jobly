import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import headerImg from "./you-x-ventures-X8H8vPcelPk-unsplash.jpg";
import './Home.css';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div id="hero" className="Home d-flex">
      <Container className="hero-container">
        <Row>
          <Col lg={7}>
            <div>
              <img className="img-fluid" src={headerImg} alt="jobly" />
            </div>
          </Col>
          <Col lg={5} className="title-text-col d-flex align-items-center mt-4 mt-lg-0 ml-auto">
            <div>
              <h1>Jobly</h1>
              <p className="lead">All the jobs in one, convenient place.</p>
              {!currentUser ? (
                <div>
                  <Link className="btn btn-primary font-weight-bold" to="/register">
                    Get Started
                  </Link>
                </div>
              ) : (
                  <div>
                    <Link className="btn btn-outline-primary font-weight-bold" to="/jobs">
                      View Jobs
                  </Link>
                  </div>
                )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;