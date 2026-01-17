import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';  // FontAwesome icons

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://192.168.9.115:5000/api/collectionRoutes/viewCollection');
        setCollections(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection ?")) return;
   try {
  const response = await axios.delete(`http://192.168.9.115:5000/api/collectionRoutes/delete/${id}`);
  if (response.status === 200) {
    alert('Collection deleted successfully!');
  } else {
    alert('Unexpected response from server');
  }
} catch (error) {
  alert('Failed to delete the collection');
  console.error(error);
}
  };

  if (loading) return <div className="text-center mt-5">Loading Collection...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-4">
        <div className="col-sm-7">
          <h2 className="mb-0">Collections List</h2>
        </div>
        <div className="col-sm-5 text-end">
          <Link to="/dashboard/category/add-collection">
            <button className="btn btn-dark">Add Collection</button>
          </Link>
        </div>
      </div>

      {collections.length === 0 ? (
        <div className="alert alert-info">No collections found.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Rules</th>
              <th>Actions</th>  {/* Added Actions header */}
            </tr>
          </thead>
          <tbody>
            { collections.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td>{ cat.type }</td>
                 <td> {cat.rules.length > 0 ? (
          <ul>
            {cat.rules.map(rule => (
              <li key={rule._id}>
                Field: {rule.field}, Operator: {rule.operator}, Value: {rule.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No rules defined.</p>
        )}</td>
                <td>
                  {/* Edit Link */}
                  <Link
                    to={`/dashboard/category/Update-Collection/${cat._id}`}
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

export default Collections;
 