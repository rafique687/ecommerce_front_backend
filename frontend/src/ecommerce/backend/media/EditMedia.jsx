import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mediaData, setMediaData] = useState({
    type: '',
    productId: '',
    filePath: ''
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);

  // Fetch media and products on mount
  useEffect(() => {
    const fetchMediaAndProducts = async () => {
      try {
        const [mediaRes, productsRes] = await Promise.all([
          axios.get(`http://192.168.9.115:5000/api/media/single/${id}`),
          axios.get('http://192.168.9.115:5000/api/displayproducts'),
        ]);

        setMediaData({
          type: mediaRes.data.mediaType,
          productId: mediaRes.data.productId?._id || '',
          filePath: mediaRes.data.filePath
        });

        setProducts(productsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load media or products.');
        setLoading(false);
      }
    };

    fetchMediaAndProducts();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMediaData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('type', mediaData.mediaType);
      formData.append('productId', mediaData.productId);

      files.forEach((file) => {
        formData.append('file', file);
      });

      await axios.put(`http://192.168.9.115:5000/api/media/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Media updated successfully');
      navigate('/dashboard/media');
    } catch (err) {
      console.error(err);
      alert('Failed to update media');
    }
  };

  // Render
  if (loading) return <div className="text-center mt-5">Loading media details...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Media</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="mediaType" className="form-label">Media Type</label>
          <select
            id="mediaType"
            name="mediaType"
            className="form-select"
            value={mediaData.mediaType}
            onChange={handleChange}
            required
          >
            <option value="">Select media type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="3D">3D</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="productId" className="form-label">Product</label>
          <select
            id="productId"
            name="productId"
            className="form-select"
            value={mediaData.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select product</option>
            {products.map((prod) => (
              <option key={prod._id} value={prod._id}>
                {prod.productname}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Media Files</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept=".jpg,.jpeg,.png,.mp4,.mov,.glb,.gltf,.obj"
            onChange={handleFileChange}
          />
          <small className="text-muted">Accepted: images, videos, 3D models (.glb, .gltf, .obj)</small>

          {/* Preview selected files */}
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn btn-primary">Update Media</button>
      </form>
    </div>
  );
};

export default EditMedia;
