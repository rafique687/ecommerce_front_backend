import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
   // const { id: productId } = useParams(); // Get product ID from URL
   const  pras = useParams()
    const productId=pras.productId;
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [existingImage, setExistingImage] = useState(null);

    const [categoryid, setCategory] = useState('');
    const [subcategoryid, setSubcateId] = useState('');
    const [productSize, setSize] = useState('');
    const [productColor, setColor] = useState('');
    const [Prod_id,setProdId]=useState('');

    const [formData, setFormData] = useState({
        image: null,
        productname: '',
        description: '',
        stock: '',
        price: '',
    });

    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');

    // Load categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(' http://192.168.9.115:5000/api/categories');
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
                    const res = await axios.get(`http://192.168.9.115:5000/api/displayproducts/${productId}`);
                    const product = res.data;
                     const subId=product.product.categoryid;
                    setFormData({
                        image: null, // Cannot set File object
                        productname: product.product.productname,
                        description: product.product.description,
                        stock: product.product.stock,
                        price: product.product.price,
                         stock: product.product.stock,
                    });

                    setCategory(product.productcategoryid);
                    setSubcateId(product.product.subcategoryid);
                    setSize(product.product.productSize);
                    setColor(product.product.productColor);
                    setExistingImage(product.product.image);

                    const subRes = await axios.get(`http://192.168.9.115:5000/api/subcategory/${subId}`);
                    console.log(subRes);
                    setSubCategory(subRes.data);
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
                const res = await axios.get(`http://192.168.9.115:5000/api/subcategory/${categoryid}`);
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

            const url = `http://192.168.9.115:5000/api/product/update/${productId}`
             

            const method = 'PUT';

            const res = await axios({
                method,
                url,
                data,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage(productId ? 'Product updated successfully!' : 'Product added successfully!');

            if (!productId) {
                // Clear form if it's add mode
                setFormData({
                    image: null,
                    productname: '',
                    description: '',
                    stock: '',
                    price: '',
                    productColor:'',
                    productSize:'',
                });
                setCategory('');
                setSubcateId('');
                setColor('');
                setSize('');
                setSubCategory([]);
                setExistingImage(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                navigate('/dashboard/product/view-product'); // Redirect after edit
            }
        } catch (error) {
            console.error('Submit error:', error);
            setMessage('Failed to submit product.');
        }
    };
    return (
  <div className="container mt-4"  style={{paddingBottom: '5%' }}>
    <h2>{productId ? 'Edit Product' : 'Add Product'}</h2>
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
          onChange={(e) => setSubcateId(e.target.value)}
          
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

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        {productId ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  </div>
);

};
export default UpdateProduct;
   
