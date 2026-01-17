import React from 'react';

const AOVList = () => {
    const orders = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    orderDate: '2025-08-10',
    orderTotal: 150.5,
    aov: 75.25,
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    orderDate: '2025-08-11',
    orderTotal: 200,
    aov: 100,
  },
  {
    id: 'ORD003',
    customerName: 'Alice Johnson',
    orderDate: '2025-08-12',
    orderTotal: 120,
    aov: 60,
  },
];
  return (
    <div className="container my-4">
      <h2 className="mb-4">Average Order Value List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Order Total ($)</th>
              <th>Average Order Value ($)</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(({ id, customerName, orderDate, orderTotal, aov }, index) => (
                <tr key={id || index}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>{customerName}</td>
                  <td>{new Date(orderDate).toLocaleDateString()}</td>
                  <td>{orderTotal.toFixed(2)}</td>
                  <td>{aov.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AOVList;
