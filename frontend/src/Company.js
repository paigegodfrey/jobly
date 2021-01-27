import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import UserContext from "./UserContext";
import { PropagateLoader } from "react-spinners";

const Company = () => {
  const { handle } = useParams();
  const { currentUser } = useContext(UserContext);

  const [company, setCompany] = useState(null);

  useEffect(() => {
    const getCompanyAndJobs = async () => {
      const { jobs } = currentUser;
      const companyResponse = await JoblyApi.getCompany(handle);

      // create a set with IDs of jobs applied to
      const jobsIDsAppliedTo = new Set(jobs.map(job => job.id));

      // add key for each job in company if it is applied to ---
      // this let us handle the "apply/applied" button
      companyResponse.jobs = companyResponse.jobs.map(job => ({
        ...job,
        state: jobsIDsAppliedTo.has(job.id) ? "applied" : null
      }));

      setCompany(companyResponse);
    }

    getCompanyAndJobs();
  }, [handle, currentUser]);


  const apply = async (idx) => {
    if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
      let jobId = company.jobs[idx].id;
      let message = await JoblyApi.applyToJob(jobId);

      // update state to re-render text from 'Apply' to 'Applied'
      setCompany(c => {
        let newCompany = { ...c };
        newCompany.jobs = newCompany.jobs.map(job =>
          job.id === jobId ? { ...job, state: message } : job
        );
        return newCompany;
      });
    }
  }

  if (!company) {
    return (
      <div className="fade-loader-container d-flex align-items-center justify-content-center" style={{ height: '50vh' }}>
        <PropagateLoader size='15px' color="#123abc" />
      </div>
    );
  }

  return (
    <div className="col-sm-8 offset-sm-2">
      <h2 className="text-capitalize">{company.name}</h2>
      <p className="lead">{company.description}</p>
      {company.jobs.length ? (
        <div className="JobList mt-4 row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
          {company.jobs.map((jobData, idx) => (
            <JobCard
              job={jobData}
              key={jobData.id}
              idx={idx}
              handleApply={() => apply(idx)}
            />
          ))}
        </div>
      ) : (
          <p className="lead">Sorry, no jobs were found!</p>
        )}
    </div>
  );
}

export default Company;