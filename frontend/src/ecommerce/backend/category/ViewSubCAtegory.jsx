import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';  // FontAwesome icons

const ViewSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/subcategory/all');
        setCategories(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/api/subcategory/${id}`);
      setCategories(categories.filter(cat => cat._id !== id));  // remove from UI
    } catch (error) {
      alert('Failed to delete the subcategory');
      console.error(error);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading categories...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-4">
        <div className="col-sm-7">
          <h2 className="mb-0">Subcategory List</h2>
        </div>
        <div className="col-sm-5 text-end">
          <Link to="/dashboard/category/add-sub-category">
            <button className="btn btn-dark">Add Sub Category</button>
          </Link>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="alert alert-info">No categories found.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Subcategory</th>
              <th>Status</th>
              <th>Actions</th>  {/* Added Actions header */}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>{cat.categoryid?.name || 'N/A'}</td>
                <td>{cat.subcategory}</td>
                <td>
                  <span className={cat.status === 1 ? "badge bg-success" : "badge bg-danger"}>
                    {cat.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  {/* Edit Link */}
                  <Link
                    to={`/dashboard/category/update-sub-category/${cat._id}`}
                    className="btn btn-sm btn-primary me-2"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>

                  {/* Delete Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cat._id)}
                    title="Delete"
                  >
                    <FaTrash />
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

export default ViewSubCategory;
 