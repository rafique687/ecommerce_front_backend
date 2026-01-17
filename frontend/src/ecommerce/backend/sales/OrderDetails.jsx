import React from 'react';

function OrderDetails({ order })
{
  if (!order) {
    return <p>No order details available.</p>;
  }

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3"> Total Sales</h3>
 

      <h5 className="mt-4">Items</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order Id / Date / Status</th>
           
            <th>Grand Total Price (₹)</th>
            <th>Cutomer/Email/Location</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>
               {`#${item.orderid}`}
               <br/>
                {item.name}   
                 <br/>
                <strong>Status:</strong> 
                <span>{item.status}</span>
                {/* <span className={`badge bg-${getStatusColor(item.status)}`}>{item.status}</span> */}
              </td>
              <td>{item.cutomername} <br/>{item.email } <br />
              {item.phone}</td>
              
             
              <td>{(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="text-end">Grand Total: ₹{order.total.toFixed(2)}</h5>
    </div>
  );
};

// Helper to style status
function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'shipped':
      return 'info';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
}

export default OrderDetails;
