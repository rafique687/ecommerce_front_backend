function Shipments( {shipments }) {
  console.log(shipments );
  
  if (!shipments ) {
    return <p>No order details available.</p>;
  }

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="mb-3">Order Details</h3>

      <h5 className="mt-4">Items</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Order Id</th>
            <th>Total Quantity</th>
            <th>Inventory Source</th>
            <th>Ship To</th>
            <th>Shipped Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shipments .items.map((data, index) => (
            <tr key={index}>
              <td>{`#${data.shipmentId}`}</td>
              <td>{data.orderId}</td>
              <td>{data.quantity}</td>
              <td>{data.inventory}</td>
              <td>{data.customerName}</td>
              <td>{data.shippedDate}</td>
              <td><i className="fa fa-eye"></i></td> {/* fixed icon class */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shipments;
