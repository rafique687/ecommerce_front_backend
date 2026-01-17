import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDiscountForm = () => {
  const { id } = useParams(); // discount ID from URL
  const navigate = useNavigate();

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

  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch discount details for editing
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await axios.get(`http://192.168.9.115:5000/api/discount/single/${id}`);
        const discount = res.data;

        setFormData({
          product_id: discount.product_id?._id || discount.product_id || "",
          type: discount.type || "percentage",
          value: discount.value || "",
          start_date: discount.start_date?.substring(0, 10) || "",
          end_date: discount.end_date?.substring(0, 10) || "",
          conditions: {
            min_qty: discount.conditions?.min_qty || 1,
            user_role: discount.conditions?.user_role || "any",
          },
        });
      } catch (err) {
        setError("Failed to load discount details");
      }
    };

    fetchDiscount();
  }, [id]);

  // Fetch products list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://192.168.9.115:5000/api/displayproducts");
        setProducts(res.data);
      } catch (err) {
        setError("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

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
      await axios.put(`http://192.168.9.115:5000/api/discount/update/${id}`, formData);
      setSuccess(true);

      // Optionally redirect after successful update
      setTimeout(() => navigate("/dashboard/discount"), 1000);
    } catch (err) {
      setError("Failed to update discount");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Edit Discount</h2>

      {success && (
        <div className="alert alert-success" role="alert">
          Discount updated successfully!
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="product_id" className="form-label">Product</label>
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
            <label htmlFor="type" className="form-label">Discount Type</label>
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

        {/* Row 2 */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="value" className="form-label">Value</label>
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
            <label htmlFor="min_qty" className="form-label">Minimum Quantity</label>
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

        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="start_date" className="form-label">Start Date</label>
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
            <label htmlFor="end_date" className="form-label">End Date</label>
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

      

        {/* Submit */}
        <button type="submit" className="btn btn-primary float-end">
          Update Discount
        </button>
      </form>
    </div>
  );
};

export default EditDiscountForm;
