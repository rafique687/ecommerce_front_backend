import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateSubcategory = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories and subcategory details on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories
        const categoriesRes = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoriesRes.data);

        // Fetch subcategory details by ID
        const subcatRes = await axios.get(`http://localhost:5000/api/subcategory/single/${id}`);
        const subcatData = subcatRes.data;
        console.log(subcatData);
        setSubcategory(subcatData.subcategory || '');
        setCategory(subcatData.categoryid || '');

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/subcategory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category, subcategory: subcategory }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Subcategory updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update subcategory.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Update Subcategory</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Select Category</label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option  value={cat._id} key={cat._id} >{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="subcategory" className="form-label">Subcategory Name</label>
          <input
            type="text"
            id="subcategory"
            className="form-control"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Update Subcategory</button>
        </div>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default UpdateSubcategory;
