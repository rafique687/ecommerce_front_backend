import React from 'react';

const BestSellersTable = () => {
    const products = [
  { name: 'Wireless Headphones', unitsSold: 1200, revenue: 48000, conversionRate: 5.8 },
  { name: 'Smartwatch Pro', unitsSold: 950, revenue: 71250, conversionRate: 6.1 },
  { name: '4K Monitor', unitsSold: 720, revenue: 86400, conversionRate: 4.2 },
  { name: 'Gaming Mouse', unitsSold: 1500, revenue: 37500, conversionRate: 7.3 },
];

  return (
    <div className="container my-4">
      <h2 className="mb-4">Best-Selling Products</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Revenue ($)</th>
              <th>Conversion Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id || index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.unitsSold.toLocaleString()}</td>
                  <td>{product.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td>{product.conversionRate.toFixed(2)}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No best-selling product data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellersTable;
