import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCollectionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'manual',
    productIds: [],
    rules: []
  });

  const [allProducts, setAllProducts] = useState([]);
  const [newRule, setNewRule] = useState({ field: '', operator: '', value: '' });
  const [status, setStatus] = useState({ message: '', error: false });

  // Fetch products for manual selection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://192.168.9.115:5000/api/products'); // adjust this URL
        setAllProducts(res.data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  // General input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manual: Select product IDs
  const handleProductSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const ids = selectedOptions.map(option => option.value);
    setFormData(prev => ({ ...prev, productIds: ids }));
  };

  // Rule-Based: Add rule
 const addRule = () => {
  const { field, operator, value } = newRule;

  if (!field || !operator || value === '') {
    alert('Please fill in all rule fields.');
    return;
  }

  setFormData(prev => ({
    ...prev,
    rules: [...prev.rules, newRule]
  }));

  setNewRule({ field: '', operator: '', value: '' });
};


  // Rule-Based: Remove rule
  const removeRule = (index) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, rules: updatedRules }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
      };

      if (formData.type === 'manual') {
        payload.productIds = formData.productIds;
      } else if (formData.type === 'rule-based') {
        payload.rules = formData.rules;
      }

      const res = await axios.post('http://192.168.9.115:5000/api/collectionRoutes/addcollection', payload);
      setStatus({ message: 'Collection added successfully!', error: false });

      // Reset
      setFormData({
        name: '',
        description: '',
        type: 'manual',
        productIds: [],
        rules: []
      });
    } catch (err) {
      console.error(err);
      setStatus({ message: 'Failed to add collection.', error: true });
    }
  };

  return (
    <div className="container">
      <h2>Add New Collection</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Collection Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="manual">Manual</option>
            <option value="rule-based">Rule-Based</option>
          </select>
        </div>

        {formData.type === 'manual' && (
          <div className="form-group mt-3">
            <label>Select Products:</label>
            <select
              multiple
              className="form-select"
              value={formData.productIds}
              onChange={handleProductSelect}
            >
              {allProducts.map(prod => (
                <option key={prod._id} value={prod._id}>
                  {prod.productname}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.type === 'rule-based' && (
          <div className="mt-4">
            <h5>Rules</h5>
            {formData.rules.map((rule, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <span>{rule.field} {rule.operator} {rule.value}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => removeRule(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="d-flex gap-2">
              <select
                value={newRule.field}
                onChange={(e) => setNewRule(prev => ({ ...prev, field: e.target.value }))}
                className="form-select"
              >
                <option value="">Select Field</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
                <option value="tags">Tags</option>
              </select>

              <select
                value={newRule.operator}
                onChange={(e) => setNewRule(prev => ({ ...prev, operator: e.target.value }))}
                className="form-select"
              >
                <option value="">Select Operator</option>
                <option value="lt">Less Than</option>
                <option value="gt">Greater Than</option>
                <option value="eq">Equal</option>
                <option value="includes">Includes</option>
              </select>

              <input
                type="text"
                value={newRule.value}
                onChange={(e) => setNewRule(prev => ({ ...prev, value: e.target.value }))}
                className="form-control"
                placeholder="Value"
              />

              <button type="button" className="btn btn-success" onClick={addRule}>
                Add Rule
              </button>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-4">
          Add Collection
        </button>
      </form>

      {status.message && (
        <div className={`alert ${status.error ? 'alert-danger' : 'alert-success'} mt-3`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default AddCollectionForm;
