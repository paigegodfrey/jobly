import React from 'react';
import './Card.css';

const JobCard = ({ job = {}, handleApply }) => {
  const { title, name, salary, equity } = job;

  let formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let formattedSalary = formatCurrency.format(salary).slice(0, -3);
  let formattedEquity = Math.round(equity * 100, 0) + '%';

  return (
    <div className="col">
      <div className="JobCard Card card">
        <div className="card-body">
          <h6 className="card-title font-weight-bold d-flex justify-content-between">
            <span className="text-capitalize">{title}</span>
          </h6>
          {name && <div>Company: {name}</div>}
          <div>Salary: {formattedSalary}</div>
          <div>Equity: {formattedEquity}</div>
          <button
            className="job-btn btn btn-secondary font-weight-bold"
            onClick={handleApply}
            disabled={job.state}
          >
            {job.state ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;