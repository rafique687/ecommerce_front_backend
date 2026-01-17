import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerInsights = ({
  newCustomers = 0,
  returningCustomers = 0,
  lifetimeValue = 0,
}) => {
  const total = newCustomers + returningCustomers;
  const data = {
    labels: ['New Customers', 'Returning Customers'],
    datasets: [
      {
        label: 'Customer Types',
        data: [newCustomers, returningCustomers],
        backgroundColor: ['#4e73df', '#1cc88a'],
        hoverBackgroundColor: ['#2e59d9', '#17a673'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Customer Insights</h2>
      <div className="row align-items-center">
        {/* Pie chart */}
        <div className="col-md-6 mb-4">
          <Link to="/dashboard/cutomers/newVsreturning">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">New vs. Returning Customers</h5>
              {total > 0 ? (
                <Pie data={data} />
              ) : (
                <p className="text-center text-muted">No customer data available</p>
              )}
            </div>
          </div>
          </Link>
        </div>

        {/* Lifetime Value */}
        <div className="col-md-6 mb-4">
          <Link to="/dashboard/cutomers/liftimevalue">
          <div className="card border-info shadow-sm h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Customer Lifetime Value</h5>
              <p className="display-4">${lifetimeValue.toFixed(2)}</p>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;
