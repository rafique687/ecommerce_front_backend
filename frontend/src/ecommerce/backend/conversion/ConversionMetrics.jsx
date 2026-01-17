import React from 'react';
import { Link } from 'react-router-dom';

const ConversionMetrics = ({
  conversionRate = 0,
  abandonedCartRate = 0,
}) => {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Conversion Metrics</h2>
      <div className="row text-center">
        {/* Conversion Rate */}
        <div className="col-md-6 mb-3">
          <Link to="/dashboard/conversion/rating">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Conversion Rate</h5>
              <p className="display-5 text-success">
                {conversionRate.toFixed(2)}%
              </p>
            </div>
          </div>
          </Link>
        </div>

        {/* Abandoned Cart Rate */}
        <div className="col-md-6 mb-3">
          <Link to="/dashboard/conversion/abandon">
          <div className="card border-danger shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Abandoned Cart Rate</h5>
              <p className="display-5 text-danger">
                {abandonedCartRate.toFixed(2)}%
              </p>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConversionMetrics;
