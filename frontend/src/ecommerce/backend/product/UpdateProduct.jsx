import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    // ----------------------------------------------------
      const [tieredPricing, setTieredPricing] = useState([
    { minQty: '', maxQty: '', price: '' },
  ]);


  const addTier = () => {
  setTieredPricing([...tieredPricing, { minQty: '', maxQty: '', price: '' }]);
};

const removeTier = (index) => {
  const updated = tieredPricing.filter((_, i) => i !== index);
  setTieredPricing(updated);
};
  const baseUrl = import.meta.env.VITE_BASE_URL;
    //-----------------------------------------------------
  const pras = useParams();
  const productId = pras.productId;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [existingImage, setExistingImage] = useState(null);

  const [categoryid, setCategory] = useState('');
  const [subcategoryid, setSubcateId] = useState('');
  const [productSize, setSize] = useState('');
  const [productColor, setColor] = useState('');
  const [subcategoryName, setSubcategoryName] =useState('');
  const [finalSlug,setFinalSlug]=useState('');

  const [formData, setFormData] = useState({
    image: null,
    productname: '',
    description: '',
    stock: '',
    price: '',
    // SEO Fields
    metaTitle: '',
    metaDescription: '',
    slug: '',
    status:''
    
  });

  const [showSEO, setShowSEO] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Load product data if editing
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:5000/api/displayproducts/${productId}`);
          const product = res.data.product;
         // console.log(product);

          setFormData({
            image: null, // file input can't be set directly
            productname: product.productname || '',
            description: product.description || '',
            stock: product.product_stock || '',
            price: product.price || '',
            metaTitle: product.meta_Title || '',
            metaDescription: product.meta_Description || '',
            slug: product.url_Slug || '',
            altText: product.altText || '',
            status : product.status ||'draft',
          });
          setFinalSlug( product.url_Slug || '');
          setCategory(product.categoryid || '');
          setSubcategoryName(product.subcategory_id.subcategory || '');
          setSubcateId(product.subcategory_id || '');
          setSize(product.product_size || '');
          setColor(product.product_color || '');
          setExistingImage(product.image || '');
          setTieredPricing(product.tieredPricing || '');
         

          // Show SEO fields if any SEO data exists
          if (product.metaTitle || product.metaDescription || product.slug || product.altText) {
            setShowSEO(true);
          }

          if (product.categoryid) {
            const subRes = await axios.get(`http://127.0.0.1:5000/api/subcategory/${product.categoryid}`);
            setSubCategory(subRes.data);
          }
        } catch (err) {
          console.error('Failed to load product:', err);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  // Load subcategories when category changes
  useEffect(() => {
    if (!categoryid) return;
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/subcategory/${categoryid}`);
        setSubCategory(res.data);
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };
    fetchSubcategories();
  }, [categoryid]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  function handaleSubCate(e) {
    setSubcateId(e.target.value);
    const idd= e.target.value;

    // Find the name from subcategory array based on id
  const selectedSubCat = subcategory.find((scat) => scat._id === idd);
  setSubcategoryName(selectedSubCat ? selectedSubCat.subcategory : '');
  }

    const productnameUrl = formData.productname;
  console.log(subcategoryName);
  useEffect(() => {
      
    if (subcategoryName || productnameUrl) {
      const slugParts = [baseUrl];
  
      if (subcategoryName) slugParts.push(subcategoryName);
      if (productnameUrl) slugParts.push(productnameUrl);
  
      setFinalSlug(slugParts.join('/'));
    }
  }, [baseUrl, subcategoryName, productnameUrl]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('categoryid', categoryid);
      data.append('subcategoryid', subcategoryid);
      if (formData.image) data.append('image', formData.image);
      data.append('productname', formData.productname);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('productSize', productSize);
      data.append('stock', formData.stock);
      data.append('productColor', productColor);
      data.append('status', formData.status);
     // data.append('tieredPricing', tieredPricing);
      data.append('tieredPricing', JSON.stringify(tieredPricing));

      if (showSEO) {
        data.append('metaTitle', formData.metaTitle);
        data.append('metaDescription', formData.metaDescription);
        data.append('slug', finalSlug);
        data.append('altText', formData.altText);
      }

      const url = `http://127.0.0.1:5000/api/product/update/${productId}`;
      const res = await axios.put(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Product updated successfully!');
      navigate('/dashboard/product/view-product'); // Redirect after edit
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Failed to submit product.');
    }
  };

  return (
    <div className="container mt-4" style={{ paddingBottom: '5%' }}>
      <h2>{productId ? 'Edit Product' : 'Add Product'}</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={categoryid}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="mb-3">
          <label className="form-label">Subcategory</label>
          <select
            className="form-select"
            value={subcategoryid}
            onChange={handaleSubCate}
           // onChange={(e) => setSubcateId(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {subcategory.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.subcategory}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          {existingImage && (
            <div className="mb-2">
              <img
                src={existingImage}
                alt="Existing"
                style={{ maxHeight: '100px' }}
              />
            </div>
          )}
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            className="form-control"
            onChange={handleChange}
            accept="image/*"
            required={!productId}
          />
        </div>

        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="productname"
            value={formData.productname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Size */}
        <div className="mb-3">
          <label className="form-label">Size</label>
          <select
            className="form-select"
            value={productSize}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        {/* Color */}
        <div className="mb-3">
          <label className="form-label">Color</label>
          <select
            className="form-select"
            value={productColor}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="">Select Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="black">Black</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        {/*-----------------Start Tiered Price-------------------------------------------------------------------*/}
          <div className="mb-3">
          <label className="form-label">Tiered Pricing</label>
          {tieredPricing.map((tier, idx) => (
          <div key={idx} className="d-flex gap-2 mb-2 align-items-center">
          <input
          type="number"
          placeholder="Min Qty"
          value={tier.minQty}
          onChange={(e) => handleTierChange(idx, 'minQty', e.target.value)}
          className="form-control"
          min="0"
          required
          />
          <input
          type="number"
          placeholder="Max Qty"
          value={tier.maxQty}
          onChange={(e) => handleTierChange(idx, 'maxQty', e.target.value)}
          className="form-control"
          min="0"
          />
          <span className="input-group-text">₹</span>
          <input
          type="number"
          placeholder="Price"
          value={tier.price}
          onChange={(e) => handleTierChange(idx, 'price', e.target.value)}
          className="form-control"
          min="0"
          required
          />
          <button type="button" className="btn btn-danger btn-sm" onClick={() => removeTier(idx)}>
          Remove
          </button>
          </div>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={addTier}>
          Add Tier
          </button>
          </div>

        {/* ---------------End tired price--------------------------------------------------------------------- */}

        {/* SEO Toggle */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="seoToggle"
            checked={showSEO}
            onChange={() => setShowSEO(!showSEO)}
          />
          <label className="form-check-label" htmlFor="seoToggle">
            Add SEO Meta Info
          </label>
        </div>

        {/* SEO Fields */}
        {showSEO && (
          <div className="card card-body mb-3">
            <div className="mb-3">
              <label className="form-label">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                className="form-control"
                value={formData.metaTitle}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Meta Description</label>
              <textarea
                name="metaDescription"
                className="form-control"
                value={formData.metaDescription}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">URL Slug</label>
              <input
                type="text"
                name="slug"
                className="form-control"
                value={finalSlug}
                onChange={handleChange}
              />
            </div>

            {/* <div className="mb-3">
              <label className="form-label">Alt Text for Image</label>
              <input
                type="text"
                name="altText"
                className="form-control"
                value={formData.altText}
                onChange={handleChange}
              />
            </div> */}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          {productId ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
