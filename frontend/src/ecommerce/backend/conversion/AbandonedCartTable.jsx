import React from 'react';

const AbandonedCartTable = () => {
    const data = [
  { source: 'Organic Search', cartStarts: 1000, checkouts: 700 },
  { source: 'Paid Ads', cartStarts: 800, checkouts: 520 },
  { source: 'Email Campaign', cartStarts: 600, checkouts: 300 },
  { source: 'Social Media', cartStarts: 450, checkouts: 270 },
  { source: 'Referral', cartStarts: 300, checkouts: 195 },
];

  return (
    <div className="container my-4">
      <h2 className="mb-4">Abandoned Cart Rate</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Source / Channel</th>
              <th>Cart Starts</th>
              <th>Completed Checkouts</th>
              <th>Abandoned Carts</th>
              <th>Abandonment Rate (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => {
                const abandoned = row.cartStarts - row.checkouts;
                const abandonRate = row.cartStarts
                  ? ((abandoned / row.cartStarts) * 100).toFixed(2)
                  : '0.00';
                return (
                  <tr key={row.source || index}>
                    <td>{index + 1}</td>
                    <td>{row.source}</td>
                    <td>{row.cartStarts.toLocaleString()}</td>
                    <td>{row.checkouts.toLocaleString()}</td>
                    <td>{abandoned.toLocaleString()}</td>
                    <td>{abandonRate}%</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbandonedCartTable;
