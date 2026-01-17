import React from 'react';
import { Link } from "react-router-dom";

const SalesDashboard = ({
  totalSales = 0,
  averageOrderValue = 0,
  orderCount = 0
}) => { console.log("kkkkkk");
  return (
    
    <div className="container my-4">
      
      <h2 className="mb-4">Sales Dashboard</h2>
      <div className="row text-center">
        {/* Total Sales */}
     
        <div className="col-md-4 mb-3">
             <Link to="/dashboard/sales/Orders">
          <div className="card border-primary shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text display-5">${totalSales.toLocaleString()}</p>
            </div>
          </div>
            </Link>
        </div>
      
      

        {/* Average Order Value */}
        <div className="col-md-4 mb-3">
          <Link to="/dashboard/sales/AOVList">
          <div className="card border-success shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Average Order Value (AOV)</h5>
              <p className="card-text display-5">${averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
          </Link>
        </div>

        {/* Order Count */}
        <div className="col-md-4 mb-3">
          <div className="card border-info shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order Count</h5>
              <p className="card-text display-5">{orderCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
