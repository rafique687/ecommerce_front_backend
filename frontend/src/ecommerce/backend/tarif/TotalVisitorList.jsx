import React from 'react';

const TotalVisitorList = () => {

    const visitors = [
  {
    id: 'V001',
    name: 'Alice Johnson',
    visitDate: '2025-08-11T10:30:00',
    pagesVisited: 5,
    duration: 12,
  },
  {
    id: 'V002',
    name: 'Bob Smith',
    visitDate: '2025-08-11T11:00:00',
    pagesVisited: 3,
    duration: 7,
  },
  {
    id: 'V003',
    name: 'Carol White',
    visitDate: '2025-08-11T11:15:00',
    pagesVisited: 8,
    duration: 20,
  },
];
  return (
    <div className="container my-4">
      <h2 className="mb-4">Total Visitor List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Visitor ID</th>
              <th>Name</th>
              <th>Visit Date</th>
              <th>Pages Visited</th>
              <th>Duration (mins)</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map(({ id, name, visitDate, pagesVisited, duration }, index) => (
                <tr key={id || index}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{new Date(visitDate).toLocaleString()}</td>
                  <td>{pagesVisited}</td>
                  <td>{duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No visitors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalVisitorList;
