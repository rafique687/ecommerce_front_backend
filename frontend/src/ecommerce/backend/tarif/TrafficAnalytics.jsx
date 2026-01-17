import React from 'react';
import { Link } from 'react-router-dom';

const TrafficAnalytics = ({
  visitorCount = 0,
  topPages = [],
  referrers = [],
}) => {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Traffic Analytics</h2>
      <div className="row mb-4">
        {/* Visitor Count */}
        <div className="col-md-4">
          <Link to="/dashboard/trafic/visitors">
          <div className="card border-primary shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Visitor Count</h5>
              <p className="display-4">{visitorCount.toLocaleString()}</p>
            </div>
          </div>
          </Link>
        </div>
        
      </div>

      <div className="row">
        {/* Top Pages */}
        <div className="col-md-6 mb-4">
            <Link to="/dashboard/trafic/top-pages">
          <div className="card border-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Top Pages</h5>
              <ul className="list-group list-group-flush">
                {topPages.length > 0 ? (
                  topPages.map(({ page, visits }, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      {page}
                      <span className="badge bg-success rounded-pill">{visits.toLocaleString()}</span>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No data available</li>
                )}
              </ul>
            </div>
          </div>
          </Link>
        
        </div>

        {/* Referrers */}
        <div className="col-md-6 mb-4">
          <Link to="/dashboard/trafic/refer">
          <div className="card border-info shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Referrer Data</h5>
              <ul className="list-group list-group-flush">
                {referrers.length > 0 ? (
                  referrers.map(({ source, visits }, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      {source}
                      <span className="badge bg-info rounded-pill">{visits.toLocaleString()}</span>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No data available</li>
                )}
              </ul>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalytics;
