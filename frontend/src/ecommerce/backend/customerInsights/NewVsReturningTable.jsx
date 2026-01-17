import React from 'react';

const NewVsReturningTable = () => {
    const data = [
  { source: 'Organic Search', newCustomers: 1200, returningCustomers: 600 },
  { source: 'Email Campaign', newCustomers: 300, returningCustomers: 450 },
  { source: 'Paid Ads', newCustomers: 800, returningCustomers: 200 },
  { source: 'Social Media', newCustomers: 500, returningCustomers: 350 },
];
  return (
    <div className="container my-4">
      <h2 className="mb-4">New vs. Returning Customers</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Source / Channel</th>
              <th>New Customers</th>
              <th>Returning Customers</th>
              <th>Total</th>
              <th>Returning %</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => {
                const total = row.newCustomers + row.returningCustomers;
                const returningPercent = total
                  ? ((row.returningCustomers / total) * 100).toFixed(2)
                  : '0.00';
                return (
                  <tr key={row.source || index}>
                    <td>{index + 1}</td>
                    <td>{row.source}</td>
                    <td>{row.newCustomers.toLocaleString()}</td>
                    <td>{row.returningCustomers.toLocaleString()}</td>
                    <td>{total.toLocaleString()}</td>
                    <td>{returningPercent}%</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No customer data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewVsReturningTable;
