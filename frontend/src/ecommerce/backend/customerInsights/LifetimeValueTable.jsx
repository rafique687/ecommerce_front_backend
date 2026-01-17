import React from 'react';

const LifetimeValueTable = () => {
    const data = [
  { segment: 'New Customers', aov: 50.25, frequency: 2.5 },
  { segment: 'Returning Customers', aov: 72.10, frequency: 4.8 },
  { segment: 'VIP Customers', aov: 125.40, frequency: 8.2 },
  { segment: 'Email Subscribers', aov: 60.00, frequency: 3.3 },
];

  return (
    <div className="container my-4">
      <h2 className="mb-4">Customer Lifetime Value (LTV)</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer Segment</th>
              <th>Average Order Value ($)</th>
              <th>Purchase Frequency</th>
              <th>Lifetime Value ($)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => {
                const lifetimeValue = (item.aov * item.frequency).toFixed(2);
                return (
                  <tr key={item.segment || index}>
                    <td>{index + 1}</td>
                    <td>{item.segment}</td>
                    <td>{item.aov.toFixed(2)}</td>
                    <td>{item.frequency.toFixed(2)}</td>
                    <td>{lifetimeValue}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No LTV data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LifetimeValueTable;
