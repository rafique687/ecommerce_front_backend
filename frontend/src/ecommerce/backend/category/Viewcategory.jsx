import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";  // Import icons

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //const API_URL = process.env.REACT_APP_API_URL;
   //console.log("api----",API_URL);

  const fetchCategories = async () => {
    try {
      setLoading(true);
     const res = await axios.get("http://127.0.0.1:5000/api/categories");
     
     

    // fetch(`${API_URL}/api/loginRoutes`,
    //const res = await axios.get("http://192.168.9.115:5000/api/categories");
    //const res = await axios.get(`${API_URL}/categories`);
     //console.log(res.data);
    
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
    //  await axios.delete(`http://localhost:5000/api/categories/${id}`);
    await axios.delete(`http://127.0.0.1:5000/api/categories/${id}`);
    
      fetchCategories();
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading categories...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-4">
        <div className="col-sm-7">
          <h2 className="mb-0">Category List</h2>
        </div>
        <div className="col-sm-5 text-end">
          <Link to="/dashboard/category/add-category">
            <button className="btn btn-dark">Add Category</button>
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>{cat.name}</td>
                <td>
                  <span className={cat.status === 1 ? "badge bg-success" : "badge bg-danger"}>
                    {cat.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <Link to={`/dashboard/category/update-category/${cat._id}`} className="me-3 text-primary" title="Update">
                    <FaEdit style={{ cursor: "pointer", fontSize: "1.2rem" }} />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(cat._id)}
                    style={{ cursor: "pointer", color: "red", fontSize: "1.2rem" }}
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewCategory;
