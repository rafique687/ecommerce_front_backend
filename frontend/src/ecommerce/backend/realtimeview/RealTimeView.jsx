import React from 'react';
import { Link } from 'react-router-dom';

const RealTimeView = ({ activeVisitors = 0, liveOrders = 0 }) => {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Real-Time View</h2>
      <div className="row text-center">
        {/* Active Visitors */}
        <div className="col-md-6 mb-3">
          <Link to="/dashboard/realtime/active-visitors">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Active Visitors</h5>
              <p className="display-4 text-primary">{activeVisitors.toLocaleString()}</p>
            </div>
          </div>
          </Link>
        </div>

        {/* Live Orders */}
        <div className="col-md-6 mb-3">
          <Link to="/dashboard/realtime/live-orders">
          <div className="card border-warning shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Live Orders</h5>
              <p className="display-4 text-warning">{liveOrders.toLocaleString()}</p>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RealTimeView;
