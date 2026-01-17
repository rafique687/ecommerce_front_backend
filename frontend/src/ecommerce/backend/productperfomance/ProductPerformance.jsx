import React from 'react';
import { Link } from 'react-router-dom';

const ProductPerformance = ({
  bestSellers = [],
  inventoryTurnover = [],
}) => {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Product Performance</h2>
      <div className="row">
        {/* Best Sellers */}
        <div className="col-md-6 mb-4">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <Link to="/dashboard/performance/best-seller">
              <h5 className="card-title">Best-Sellers</h5>
              <ul className="list-group list-group-flush mt-3">
                {bestSellers.length > 0 ? (
                  bestSellers.map(({ name, unitsSold }, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {name}
                      <span className="badge bg-primary rounded-pill">
                        {unitsSold.toLocaleString()} sold
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No data available</li>
                )}
              </ul>
              </Link>
            </div>
          </div>
        </div>

        {/* Inventory Turnover */}
        <div className="col-md-6 mb-4">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
               <Link to="/dashboard/performance/inventory">
              <h5 className="card-title">Inventory Turnover</h5>
              <ul className="list-group list-group-flush mt-3">
                {inventoryTurnover.length > 0 ? (
                  inventoryTurnover.map(({ name, turnoverRate }, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {name}
                      <span className="badge bg-success rounded-pill">
                        {turnoverRate.toFixed(2)}x
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No data available</li>
                )}
              </ul>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;
