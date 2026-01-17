import React from 'react';

const ConversionRateTable = () => {
    const data = [
  { source: 'Email Campaign', visitors: 1500, conversions: 135 },
  { source: 'Organic Search', visitors: 3000, conversions: 420 },
  { source: 'Paid Ads', visitors: 2000, conversions: 260 },
  { source: 'Social Media', visitors: 1200, conversions: 110 },
  { source: 'Referral', visitors: 800, conversions: 95 },
];
  return (
    <div className="container my-4">
      <h2 className="mb-4">Conversion Rate Breakdown</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Source / Channel</th>
              <th>Visitors</th>
              <th>Conversions</th>
              <th>Conversion Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => {
                const conversionRate = row.visitors
                  ? ((row.conversions / row.visitors) * 100).toFixed(2)
                  : '0.00';
                return (
                  <tr key={row.source || index}>
                    <td>{index + 1}</td>
                    <td>{row.source}</td>
                    <td>{row.visitors.toLocaleString()}</td>
                    <td>{row.conversions.toLocaleString()}</td>
                    <td>{conversionRate}%</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConversionRateTable;
