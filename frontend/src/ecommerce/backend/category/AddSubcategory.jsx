import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddSubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory,setSubCategory]=useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/categories');
        setCategories(res.data);
        console.log('Fetched categories:', res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
 
   try {
      const response = await fetch('http://127.0.0.1:5000/api/subcategory',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: category,subcategory:subcategory }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Category added successfully!');
        setCategory('');
      } else {
        setMessage(data.message || 'Failed to add category');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again.');
    }
  };
// async  function handelcate(e)
// {
 
//     e.preventDefault();
//   //console.log(e.target.value);
//   setCategory(e.target.value)
//   const id=e.target.value;
//   try {
//         const res = await axios.get(`http://localhost:5000/api/subcategory/${id}`);
//         setSubCategory(res.data);
//         console.log('Fetched categories:', res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError('Error fetching categories');
//         setLoading(false);
//       }
 
// }  
  
  return (
    <div className="container mt-4">
      <h2>Add Sub Category</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Select Category</label>
          <select className="form-control" value={category} onChange={(e)=>setCategory(e.target.value)}>
           {/* <select className="form-control" value={category} onChange={handelcate}> */}
            <option value=''>Select Category</option>
            {categories.map((cat) => (
              <option value={cat._id} key={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="category" className="form-label">Select Subcategory</label>
          <select className="form-control" value={subcategory} onChange={(e)=>setSubCategory(e.target.value)}>
             <option value='' key={'subcate'}>Select Category</option>
            {subcategory.map((scat) => (
              <option value={scat._id} key={scat._id}>{cat.subcategory}</option>
            ))}
          </select>
        </div> */}
        <div className="mb-3">
          <label htmlFor="subcategory" className="form-label">Subcategory Name</label>
          <input
            type="text"
            id="subcategory"
            className="form-control"
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Add Subcategory</button>
        </div>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddSubcategory;
