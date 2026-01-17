import React, { useEffect, useState } from "react";
import axios from 'axios';

const AddDiscountForm = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    type: "percentage",
    value: "",
    start_date: "",
    end_date: "",
    conditions: {
      min_qty: 1,
      user_role: "any",
    },
  });

const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://192.168.9.115:5000/api/displayproducts');
        setProduct(res.data);
        //console.log(res.data);
        //setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "min_qty" || name === "user_role") {
      setFormData((prev) => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          [name]: name === "min_qty" ? parseInt(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      const response = await fetch("http://192.168.9.115:5000/api/discount/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create discount");
      }

      setSuccess(true);
      setFormData({
        product_id: "",
        type: "percentage",
        value: "",
        start_date: "",
        end_date: "",
        conditions: {
          min_qty: 1,
          user_role: "any",
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Add Discount</h2>

      {success && (
        <div className="alert alert-success" role="alert">
          Discount added successfully!
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Row 1: Product and Discount Type */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="product_id" className="form-label">
              Product
            </label>
            <select
              id="product_id"
              name="product_id"
              className="form-select"
              value={formData.product_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.productname}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="type" className="form-label">
              Discount Type
            </label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
        </div>

        {/* Row 2: Value and Min Quantity */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="value" className="form-label">
              Value
            </label>
            <input
              type="number"
              id="value"
              name="value"
              className="form-control"
              value={formData.value}
              onChange={handleChange}
              required
              min="0"
              step="any"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="min_qty" className="form-label">
              Minimum Quantity
            </label>
            <input
              type="number"
              id="min_qty"
              name="min_qty"
              className="form-control"
              value={formData.conditions.min_qty}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>

        {/* Row 3: Start Date and End Date */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="start_date" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="form-control"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="end_date" className="form-label">
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="form-control"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 4: User Role */}
      

        <button type="submit" className="btn btn-primary float-end">
          Add Discount
        </button>
      </form>
    </div>
  );
};

export default AddDiscountForm;
