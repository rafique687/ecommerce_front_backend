import React from 'react';

const InventoryTurnoverTable = () => {
    
const products = [
  { name: 'Laptop X1', unitsSold: 500, averageInventory: 100 },
  { name: 'Wireless Earbuds', unitsSold: 1200, averageInventory: 300 },
  { name: '4K TV', unitsSold: 150, averageInventory: 75 },
  { name: 'Gaming Console', unitsSold: 350, averageInventory: 200 },
];
  return (
    <div className="container my-4">
      <h2 className="mb-4">Inventory Turnover</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Average Inventory</th>
              <th>Turnover Rate</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => {
                const turnoverRate = product.averageInventory
                  ? (product.unitsSold / product.averageInventory).toFixed(2)
                  : '0.00';
                return (
                  <tr key={product.id || index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.unitsSold.toLocaleString()}</td>
                    <td>{product.averageInventory.toLocaleString()}</td>
                    <td>{turnoverRate}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No inventory data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTurnoverTable;
