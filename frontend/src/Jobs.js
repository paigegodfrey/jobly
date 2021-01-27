import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import { PropagateLoader } from "react-spinners";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsLoaded, setJobsLoaded] = useState(false);
  
  const searchJobs = async (search) => {
    let jobsResponse = await JoblyApi.getJobs(search);
    setJobs(jobsResponse);
    setJobsLoaded(true);
  }

  useEffect(() => {
    searchJobs();
  }, []);

  const apply = async idx => {
    let jobId = jobs[idx].id;
    let message = await JoblyApi.applyToJob(jobId);

    // update state to re-render text from 'Apply' to 'Applied'
    setJobs(j => j.map(job => 
      job.id === jobId ? { ...job, state: message} : job
    ));
  }

  if (!jobsLoaded) {
    return (
      <div className="fade-loader-container d-flex align-items-center justify-content-center" style={{height: '50vh'}}>
        <PropagateLoader size='15px' color="#123abc"/>
      </div>
    );
  }

  return (
    <div className="Jobs col-md-8 offset-md-2">
          <h1>These jobs are available!</h1>
          <p className="lead">Apply to any position with a single click.</p>
      <SearchBar searchFor={searchJobs} />
      {jobs.length ? (
        <div className="JobList row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
          {jobs.map((jobData, idx) => (
            <JobCard
              job={jobData}
              key={jobData.id}
              idx={idx}
              handleApply={() => apply(idx)}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default Jobs;