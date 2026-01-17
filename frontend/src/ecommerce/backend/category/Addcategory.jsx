import React, { useEffect ,useState } from 'react';

const Addcategory = () => {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [collectionId,setCollectionsid] = useState('');
  const [collections, setCollections] = useState([]);
   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/collectionRoutes/viewCollection');
        setCollections(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await fetch('http://localhost:5000/api/categories', {
      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_name: category }),
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

  return (
    <div className="container mt-4">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="collection" className="form-label">Select Collection</label>
          <select className="form-control" value={category} onChange={(e)=>setCollectionsid(e.target.value)}>
            <option value=''>Select Collection</option>
            {collections.map((collec) => (
              <option value={collec._id} key={collec._id}>{collec.name}</option>
            ))}
          </select>
        </div>
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
        <button type="submit" className="btn btn-primary ">Add Category</button>
        </div>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Addcategory;
