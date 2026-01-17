import React from 'react';

const LiveOrdersTable = () => {
  const orders = [
    { id: 'ORD-1001', customer: 'Alice Johnson', amount: 120.50, status: 'Processing', time: '1 min ago' },
    { id: 'ORD-1002', customer: 'Bob Smith', amount: 89.99, status: 'Completed', time: '3 mins ago' },
    { id: 'ORD-1003', customer: 'Carlos Gomez', amount: 45.00, status: 'Pending', time: 'Now' },
    { id: 'ORD-1004', customer: 'Diana Prince', amount: 230.10, status: 'Shipped', time: '5 mins ago' },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'Completed': 'success',
      'Processing': 'warning',
      'Pending': 'secondary',
      'Shipped': 'info',
      'Cancelled': 'danger',
    };
    const badgeClass = statusMap[status] || 'light';
    return <span className={`badge bg-${badgeClass}`}>{status}</span>;
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">📦 Live Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount.toFixed(2)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>{order.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No live orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveOrdersTable;
