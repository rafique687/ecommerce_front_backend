import React from 'react';

const ActiveVisitorsTable = () => {
  const visitors = [
    {
      name: 'John Doe',
      ip: '192.168.1.10',
      location: 'New York, USA',
      lastSeen: '5 seconds ago',
      device: 'Chrome (Windows)',
    },
    {
      name: 'Jane Smith',
      ip: '192.168.1.12',
      location: 'London, UK',
      lastSeen: '10 seconds ago',
      device: 'Firefox (Linux)',
    },
    {
      name: 'Ali Khan',
      ip: '192.168.1.22',
      location: 'Dubai, UAE',
      lastSeen: 'Just now',
      device: 'Safari (iOS)',
    },
  ];

  return (
    <div className="container my-4">
      <h2 className="mb-4">🟢 Active Visitors</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Last Seen</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map((visitor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{visitor.name}</td>
                  <td>{visitor.ip}</td>
                  <td>{visitor.location}</td>
                  <td>{visitor.lastSeen}</td>
                  <td>{visitor.device}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No active visitors
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveVisitorsTable;
