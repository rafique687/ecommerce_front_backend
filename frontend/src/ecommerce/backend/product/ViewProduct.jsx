import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const ViewProduct = () => {
  const [products, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-success';
    case 'draft':
      return 'bg-warning text-dark';
    case 'archived':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/displayproducts');
        setCategories(res.data);
        console.log(products);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

    const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Product?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/api/product/deleteProduct/${id}`);
      setCategories(products.filter(prod => prod._id !== id));  // remove from UI
    } catch (error) {
      alert('Failed to delete Product');
      console.error(error);
    }
  };
  //-----------------------------------------------------------------------------
  

  const handleExport = async () => {
    try {
      const response = await axios.get(' http://127.0.0.1:5000/api/product/export-excel', {
        responseType: 'blob', 
      });

     console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'products.xlsx'); // 👈 filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      alert(error.message);
      alert('Failed to export products');
    }
  } ;
   

  //-----------------------------------------------------------------------------

  if (loading) return <div className="text-center mt-5">Loading categories...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-4">
        <div className="col-sm-7">
          <h2 className="mb-0">Products List</h2>
        </div>
        <div className="col-sm-5 text-end">
          <Link to="/dashboard/product/add-product">
            <button className="btn btn-dark">Add Product</button>
          </Link>
            <Link to="/dashboard/product/uploadexcel">
            <button className="btn btn-success ms-2">Import</button>
          </Link>

             <button className="btn btn-success ms-1" onClick={handleExport}>
              Export
            </button>
        </div>
      </div>



      {products.length === 0 ? (
        <div className="alert alert-info">No categories found.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>price</th>
              <th>Size</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            {products.map((prod, index) => (
              <tr key={prod._id}>
                <td>{index + 1}</td>
                <td>{prod.productname}</td>
                <td>
                  {/* <img
                    alt="Product Image"
                    src="http://127.0.0.1:5000/uploads/1755605449746.jpg"
                    style={{ width: '30%', height: '30%' }}/> */}
                  <img src={prod.image} alt="Product Image" style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{prod.price}</td>
                 <td>{prod.product_size}</td>
                <td>{prod.product_color}</td>
                 <td>{prod.product_stock}</td>
                {/* <td>
                  <span className={prod.status === 'active'? "badge bg-success" : "badge bg-danger"}>
                    {prod.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td> */}
                <td>
                  <span className={`badge ${getStatusBadgeClass(prod.status)}`}>
                    {prod.status}</span>
                  </td>
                <td>
                  <Link
                    to={`/dashboard/product/updateProduct/${prod._id}`}
                    className="btn btn-sm btn-primary me-2"
                    title="Edit"
                  >
                <FaEdit/> 
                  </Link>

                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(prod._id)}
                    title="Delete"
                  >
                  <FaTrash/> 
                  </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewProduct;
