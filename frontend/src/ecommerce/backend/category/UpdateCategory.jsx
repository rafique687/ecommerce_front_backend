import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateCategory = () => {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => { 
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/categories/${id}`);
      const data = await res.json();
     // console.log(data.name);
      if (res.ok) {
        setCategory(data.name);
      } else {
        setMessage('Failed to load category');
      }
    } catch (err) {
      setMessage('Error loading category');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/categories/${id}`, {  // use id here
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_name: category }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Category updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category Name</label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Update Category</button>
        </div>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default UpdateCategory;
