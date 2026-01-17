import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash , FaEdit} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ViewMedia = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get('http://192.168.9.115:5000/api/media/viewmedia');
        console.log(res.data);
        setMediaList(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch media.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media file?")) return;

    try {
      await axios.delete(`http://192.168.9.115:5000/api/media/delete/${id}`);
      setMediaList(mediaList.filter((m) => m._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete media.");
    }
  };
  

  return (
    <div className="container mt-4">
      {/* Always visible */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Media Library</h2>
        <Link to="/dashboard/media/upload">
          <button className="btn btn-dark">Add Media</button>
        </Link>
      </div>

      {/* Conditional content */}
      {loading ? (
        <div className="text-center mt-5">Loading media...</div>
      ) : error ? (
        <div className="alert alert-danger mt-5">{error}</div>
      ) : mediaList.length === 0 ? (
        <div className="alert alert-info">No media files found.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Preview</th>
              <th>Type</th>
              <th>Product Name</th>
              
              <th>Uploaded At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mediaList.map((media, index) => {
             const urls = media.filePath[0]
            .split(/(?=http)/)  // split before each 'http' without removing it
            .map(u => u.trim())  // trim whitespace
            .filter(Boolean);    // remove empty strings
             const url = media.filePath? `${urls[0].replace(/\\/g, '/')}`: '';
     
            return (
                <tr key={media._id}>
                  <td>{index + 1}</td>
                  <td>
                    {media.mediaType === 'image' && (
                      <img src={url} alt="media" style={{ width: '80px', height: 'auto' }} />
                    )}
                    {media.mediaType === 'video' && (
                      <video src={url} controls style={{ width: '120px' }} />
                    )}
                    {media.mediaType === '3D' && (
                      <div
                        style={{
                          width: '100px',
                          height: '100px',
                          backgroundColor: '#eee',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontStyle: 'italic',
                          color: '#666',
                        }}
                      >
                        3D Model
                      </div>
                    )}
                  </td>
                  <td>{media.mediaType}</td>
                 <td>{media.productId && media.productId.productname ? media.productId.productname : ''}</td>
                  
                  <td>{new Date(media.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(media._id)}
                      title="Delete"
                    >
                      <FaTrash />
                     
                    </button>
                    <button className='btn btn-sm btn-info' title='Edit' style={{ marginLeft : "10px"}}>
                        <Link to={`/dashboard/media/edit/${media._id}`}>
                        <FaEdit/>
                        </Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewMedia;
