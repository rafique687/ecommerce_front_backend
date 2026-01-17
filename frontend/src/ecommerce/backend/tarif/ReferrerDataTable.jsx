import React from 'react';

const ReferrerDataTable = () => {
    
const referrers = [
  { source: 'Google', visitors: 5400 },
  { source: 'Facebook', visitors: 2100 },
  { source: 'Twitter', visitors: 850 },
  { source: 'LinkedIn', visitors: 420 },
  { source: 'Direct / None', visitors: 1950 },
];

  // Calculate total visitors for percentage breakdown
  const totalVisitors = referrers.reduce((sum, r) => sum + r.visitors, 0);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Referrer Traffic Sources</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Referrer</th>
              <th>Visitors</th>
              <th>% of Total</th>
            </tr>
          </thead>
          <tbody>
            {referrers.length > 0 ? (
              referrers.map((referrer, index) => {
                const percentage = totalVisitors
                  ? ((referrer.visitors / totalVisitors) * 100).toFixed(2)
                  : '0.00';

                return (
                  <tr key={referrer.source || index}>
                    <td>{index + 1}</td>
                    <td>{referrer.source}</td>
                    <td>{referrer.visitors.toLocaleString()}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No referrer data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferrerDataTable;
