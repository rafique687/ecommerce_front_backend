import React from 'react';

const TopTrafficPages = () => {
    const pages = [
  {
    name: '/home',
    uniqueVisitors: 1240,
    pageViews: 3100,
    avgTime: 2.4,
  },
  {
    name: '/products',
    uniqueVisitors: 870,
    pageViews: 2000,
    avgTime: 3.1,
  },
  {
    name: '/contact',
    uniqueVisitors: 400,
    pageViews: 760,
    avgTime: 1.6,
  },
];
  return (
    <div className="container my-4">
      <h2 className="mb-4">Top Traffic Pages</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Page</th>
              <th>Unique Visitors</th>
              <th>Page Views</th>
              <th>Avg. Time on Page (min)</th>
            </tr>
          </thead>
          <tbody>
            {pages.length > 0 ? (
              pages.map((page, index) => (
                <tr key={page.url || index}>
                  <td>{index + 1}</td>
                  <td>{page.name}</td>
                  <td>{page.uniqueVisitors}</td>
                  <td>{page.pageViews}</td>
                  <td>{page.avgTime.toFixed(2)}</td>
                </tr>
              ))
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

export default TopTrafficPages;
