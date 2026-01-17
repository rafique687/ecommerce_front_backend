import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
//import { getBaseUrl } from '../../../config/api';

const AddProduct = () => {
  // ----------------------------------------------------
    const [tieredPricing, setTieredPricing] = useState([
  { minQty: '', maxQty: '', price: '' },
]);
  //-----------------------------------------------------
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [categoryid, setCategory] = useState('');
  const [subcategoryid, setSubcateId] = useState('');
  const [productSize, setSize] = useState('');
  const [productColor, setColor] = useState('');
  const [showSEO, setShowSEO] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const [subcategoryName, setSubcategoryName] =useState('');
  const [finalSlug,setFinalSlug]=useState('');

  const [formData, setFormData] = useState({
    image: null,
    productname: '',
    description: '',
    stock: '',
    price: '',
    productSize: '',
    productColor: '',
    metaTitle: '',
    metaDescription: '',
    urlSlug: '',
    status: 'draft', // ✅ New status field
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/categories');
        const data = await res.json();
        if (res.ok) setCategories(data);
        else console.error('Failed to fetch categories');
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories
  async function handelcate(e) {
    e.preventDefault();
    const id = e.target.value;
    setCategory(id);

    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/subcategory/${id}`);
      setSubCategory(res.data);
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  }

  function handaleSubCate(e) {
    setSubcateId(e.target.value);
    const idd= e.target.value;

    // Find the name from subcategory array based on id
  const selectedSubCat = subcategory.find((scat) => scat._id === idd);
  setSubcategoryName(selectedSubCat ? selectedSubCat.subcategory : '');
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
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
  // const Producname_url=formData.productname;
  // var mySlug ='';
  // if(subcategoryName){
  //  //mySlug= baseUrl+'/'+ subcategoryName + '/'+FormData.productname;
  //  mySlug= baseUrl+'/'+ subcategoryName
  // }
  // if(Producname_url)
  // {
  //   mySlug= baseUrl+subcategoryName+'/'+Producname_url
  //   setFinalSlug(mySlug);
  // }
  const productnameUrl = formData.productname;

useEffect(() => {
  if (subcategoryName || productnameUrl) {
    const slugParts = [baseUrl];

    if (subcategoryName) slugParts.push(subcategoryName);
    if (productnameUrl) slugParts.push(productnameUrl);

    setFinalSlug(slugParts.join('/'));
  }
}, [baseUrl, subcategoryName, productnameUrl]);
//  console.log(finalSlug);
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
      data.append('productSize', productSize);
      data.append('stock', formData.stock);
      data.append('productColor', productColor);
      data.append('status', formData.status); // ✅ Send status

      if (showSEO) {
        data.append('metaTitle', formData.metaTitle);
        data.append('metaDescription', formData.metaDescription);
        //data.append('urlSlug', formData.urlSlug);
        data.append('urlSlug',finalSlug);
      }
      data.append('tieredPricing', JSON.stringify(tieredPricing));

      const response = await fetch('http://127.0.0.1:5000/api/product', {
        method: 'POST',
        body: data,
      });

      const resData = await response.json();

      if (response.ok) {
        setMessage('Product added successfully!');
        setFinalSlug('');
        setFormData({
          image: null,
          productname: '',
          description: '',
          stock: '',
          price: '',
          productSize: '',
          productColor: '',
          metaTitle: '',
          metaDescription: '',
          urlSlug: '',
          status: 'draft',
        });
        
        setSize('');
        setColor('');
        setSubCategory([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setMessage(resData.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className="container mt-4" style={{ paddingBottom: '5%' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="mt-3" encType="multipart/form-data">
        {/* Category */}
        <div className="mb-3">
          <label htmlFor="categoryid" className="form-label">Category</label>
          <select id="categoryid" name="categoryid" className="form-select" value={categoryid} onChange={handelcate} required>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="mb-3">
          <label className="form-label">Subcategory</label>
          <select className="form-select" value={subcategoryid} onChange={handaleSubCate} required>
            <option value="">Select Subcategory</option>
            {subcategory.map((scat) => (
              <option key={scat._id} value={scat._id}>{scat.subcategory}</option>
            ))}
          </select>
        </div>

        {/* Product Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input type="file" id="image" name="image" className="form-control" ref={fileInputRef} onChange={handleChange} accept="image/*" required />
        </div>

        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="productname" className="form-label">Product Name</label>
          <input type="text" id="productname" name="productname" className="form-control" value={formData.productname} onChange={handleChange} required />
        </div>

        {/* Size */}
        <div className="mb-3">
          <label className="form-label">Product Size</label>
          <select className="form-select" value={productSize} onChange={(e) => setSize(e.target.value)} required>
            <option value="">Select Size</option>
            <option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option><option value="XXL">XXL</option>
          </select>
        </div>

        {/* Color */}
        <div className="mb-3">
          <label className="form-label">Product Color</label>
          <select className="form-select" value={productColor} onChange={(e) => setColor(e.target.value)} required>
            <option value="">Select Color</option>
            <option value="red">Red</option><option value="blue">Blue</option><option value="green">Green</option><option value="yellow">Yellow</option><option value="black">Black</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" id="price" name="price" className="form-control" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input type="number" id="stock" name="stock" className="form-control" value={formData.stock} onChange={handleChange} required min="0" />
        </div>

        {/*-----------------Start Tiered Price-------------------------------------------------------------------*/}
            <div className="mb-3" style={{border : "2px solid #ccc"}}>
            <label className="form-label"><h4 style={{ color:"blue"}}>Tiered Pricing</h4></label>

            {tieredPricing.map((tier, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
            <input
            type="number"
            placeholder="Min Qty"
            className="form-control"
            value={tier.minQty}
            min="0"
            onChange={(e) => {
            const newTiers = [...tieredPricing];
            newTiers[index].minQty = e.target.value;
            setTieredPricing(newTiers);
            }}
            required
            />
            <input
            type="number"
            placeholder="Max Qty (leave blank for no max)"
            className="form-control"
            value={tier.maxQty}
            min="0"
            onChange={(e) => {
            const newTiers = [...tieredPricing];
            // Store null if input empty
            newTiers[index].maxQty = e.target.value === '' ? null : e.target.value;
            setTieredPricing(newTiers);
            }}
            />
             <span className="input-group-text">₹</span>
            <input
            type="number"
            placeholder="Price"
            className="form-control"
            value={tier.price}
            min="0"
            step="0.01"
            onChange={(e) => {
            const newTiers = [...tieredPricing];
            newTiers[index].price = e.target.value;
            setTieredPricing(newTiers);
            }}
            required
            />
            <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
            setTieredPricing(tieredPricing.filter((_, i) => i !== index));
            }}
            >
            Remove
            </button>
            </div>
            ))}

            <button
            type="button"
            className="btn btn-secondary float-end mt-2"
            onClick={() =>
            setTieredPricing([...tieredPricing, { minQty: '', maxQty: '', price: '' }])
            }
            >
            Add Tier
            </button>
            </div>

        {/* ---------------End tired price--------------------------------------------------------------------- */}

        {/* ✅ Product Status */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Product Status</label>
          <select id="status" name="status" className="form-select" value={formData.status} onChange={handleChange} required>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="seoToggle" checked={showSEO} onChange={() => setShowSEO(!showSEO)} />
          <label className="form-check-label" htmlFor="seoToggle"><h4 style={{ color:"blue"}}>Add SEO Meta Info</h4></label>
        </div>
       {showSEO && (
          <div className="card card-body mb-3">
            <div className="mb-3">
              <label className="form-label">Meta Title</label>
              <input type="text" name="metaTitle" className="form-control" value={formData.metaTitle} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Meta Description</label>
              <textarea name="metaDescription" className="form-control" value={formData.metaDescription} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">URL Slug</label>
              <input type="text" name="urlSlug" className="form-control" value={finalSlug} onChange={handleChange} />
            </div>

            {/* <div className="mb-3">
              <label className="form-label">Alt Text for Image</label>
              <input type="text" name="altText" className="form-control"/>
              </div> */}
              </div>)}
              

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default AddProduct;
