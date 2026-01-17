import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://192.168.9.115:5000/api/discount/view"); // Update as needed
      setDiscounts(res.data);
      console.log(discounts);
      setLoading(false);
    } catch (err) {
      setError("Error fetching discounts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this discount?")) return;

    try {
      await axios.delete(`http://192.168.9.115:5000/api/discount/delete/${id}`);
      fetchDiscounts(); // Refresh after delete
    } catch (err) {
      alert("Failed to delete discount");
    }
  };

//   if (loading) return <div className="text-center mt-5">Loading discounts...</div>;
//   if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4" style={{ position: "relative" }}>
      {/* Floating Add Discount Button */}
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
        <Link to="/dashboard/discount/add">
          <button className="btn btn-dark">Add Discount</button>
        </Link>
      </div>

      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col-sm-7">
          <h2 className="mb-0">Discount List</h2>
        </div>
      </div>

      {/* Discount Table or No Data Message */}
      {discounts.length === 0 ? (
        <div className="alert alert-info">No discounts found.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Type</th>
              <th>Value</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Min Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d, index) => (
              <tr key={d._id}>
                <td>{index + 1}</td>
                <td>{d.product_id.productname}</td>
                <td>{d.type}</td>
                <td>{d.type === "percentage" ? `${d.value}%` : `$${d.value}`}</td>
                <td>{new Date(d.start_date).toLocaleDateString()}</td>
                <td>{new Date(d.end_date).toLocaleDateString()}</td>
                <td>{d.conditions?.min_qty || 1}</td>
                
                <td>
                  <Link to={`/dashboard/discount/edit/${d._id}`} className="me-3 text-primary" title="Update">
                    <FaEdit style={{ cursor: "pointer", fontSize: "1.2rem" }} />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(d._id)}
                    style={{ cursor: "pointer", color: "red", fontSize: "1.2rem" }}
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewDiscount;
