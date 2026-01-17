import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const VarriantVise = () => {
  const [products, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://192.168.9.115:5000/api/product/varriant');
        setCategories(res.data);
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
      await axios.delete(`http://192.168.9.115:5000/api/product/deleteProduct/${id}`);
      setCategories(products.filter(prod => prod._id !== id));  // remove from UI
    } catch (error) {
      alert('Failed to delete Product');
      console.error(error);
    }
  };
  //-----------------------------------------------------------------------------
  

  const handleExport = async () => {
    try {
      const response = await axios.get(' http://192.168.9.115:5000/api/product/export-excel', {
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
          <h2 className="mb-0">Varriant Stock</h2>
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
              <th>Size</th>
              <th>Color</th>
              <th>Stock</th>
              </tr>
          </thead>
          <tbody> 
            {products.map((prod, index) => (
              <tr key={prod._id}>
                <td>{index + 1}</td>
                <td>{prod.productname}</td>
                <td>{prod.size}</td>
                <td>{prod.color}</td>
                 <td>{prod.totalStock}</td>
                
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VarriantVise;
