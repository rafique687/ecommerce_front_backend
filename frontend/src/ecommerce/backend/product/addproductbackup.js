import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryid, setCategory] = useState('');
  const [subcategory, setSubCategory] = useState([]);
  const [subcategoryid, setSubcateId] = useState('');
  const [productSize,setSize]=useState('');
   const [productColor,setColor]=useState('');
   
  const [formData, setFormData] = useState({
    image: null,
    productname: '',
    description: '',
    stock:'',
    price: '',
  });
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://192.168.9.115:5000/api/categories');
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  async function handelcate(e) {

    e.preventDefault();
    setCategory(e.target.value)
    const id = e.target.value;
    try {
      const res = await axios.get(`http://192.168.9.115:5000/api/subcategory/${id}`);
      setSubCategory(res.data);
      console.log('Fetched sub categories:', res.data);
        } catch (err) {
      console.error(err);
      setError('Error fetching sub categories');
    
    }

  }
  function handaleSubCate(e)
  {  
      setSubcateId(e.target.value);
      //console.log(subcategoryid);
  }

  // Fetch subcategories when categoryid changes
  useEffect(() => {

    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`http://192.168.9.115:5000/api/subcategories?categoryid=${formData.categoryid}`);
        const data = await res.json();
        if (res.ok) {
          setSubcategories(data);
        } else {
          console.error('Failed to fetch subcategories');
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();

  }, [formData.categoryid]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // setSubcateId(e.target.value);
    if (name === 'image') {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('categoryid', categoryid);
      data.append('subcategoryid', subcategoryid);
      data.append('image', formData.image);
      data.append('productname', formData.productname);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('productSize',productSize);
      data.append('stock',formData.stock);
      data.append('productColor',productColor);
      console.log(data);
      const response = await fetch('http://192.168.9.115:5000/api/product', {
        method: 'POST',
        body: data,
      });

      const resData = await response.json();

      if (response.ok) {
        setMessage('Product added successfully!');
       
        setFormData({
          categoryid: '',
          image: null,
          productname: '',
          productColor: '',
          productSize:'',
          description: '',
          stock:'',
          price: '',
        });
        if (fileInputRef.current) {
        fileInputRef.current.value = '';
         }
        setSubcategories([]);
      } else {
        setMessage(resData.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className="container mt-4" style={{paddingBottom: '5%' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="mt-3" encType="multipart/form-data">

        {/* Category select */}
        <div className="mb-3">
          <label htmlFor="categoryid" className="form-label">Category</label>
          <select
            id="categoryid"
            name="categoryid"
            className="form-select"
            value={formData.categoryid}
            onChange={handelcate}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="sub category" className="form-label">Select Subcategory</label>

          <select key ={11}
            className="form-control"
            value={subcategoryid}
            onChange={handaleSubCate}
            required
          >
            <option value="">Select Subcategory</option>
            {subcategory.map((scat) => (
              <option value={scat._id} key={scat._id}>
                {scat.subcategory}
              </option>
            ))}
          </select>
        </div>
        {/* Image input */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            className="form-control"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="productname" className="form-label">Product Name</label>
          <input
            type="text"
            id="productname"
            name="productname"
            className="form-control"
            value={formData.productname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sub category" className="form-label">Product Size</label>

          <select key ={'size'}
            className="form-control"
            value={formData.productSize}
             onChange={(e)=>setSize(e.target.value)}
            required
          >
            <option value="">Select Size</option>
             <option value="S" key="S">S</option>
              <option value="M" key="M">M</option>
              <option value="L" key="L">L</option>
              <option value="XL" key="XL">XL</option>
              <option value="XXL" key="XXL">XXL</option>
            
          </select>
        </div>

         <div className="mb-3">
          <label htmlFor="sub category" className="form-label">Product Color</label>

          <select key ={'color'}
            className="form-control"
            value={formData.productColor}
           onChange={(e)=>setColor(e.target.value)}
            required
          >
            <option value="">Select Color</option>
            <option value="red" key="red">Red</option>
            <option value="blue" key="blue">Blue</option>
            <option value="green" key="green">Green</option>
            <option value="yellow" key="yellow">Yellow</option>
            <option value="black" key="black">Black</option>
            
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

         <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default AddProduct;
