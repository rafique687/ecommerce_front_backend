import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MediaUploadForm = () => {
    const [productId, setProductId] = useState('');
    const [files, setFiles] = useState([]);
    const [products, setProduct] = useState([]);
    const [type,setType]=useState('');

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productId || files.length === 0) {
            alert('Please provide a product ID and select at least one media file.');
            return;
        }

        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('type', type);
        files.forEach(file => {
            formData.append('file', file); // use 'media' to match multer field
        });

        try {
            const res = await axios.post('http://192.168.9.115:5000/api/media/uploadmedia', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Upload successful');
            console.log(res.data);
        } catch (error) {
            console.error(error);
            alert('Upload failed');
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://192.168.9.115:5000/api/displayproducts');
                //console.log(res.data);
                setProduct(res.data);
                console.log(products);
                setLoading(false);
            } catch (err) {
                setError('Error fetching categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://192.168.9.115:5000/api/displayproducts');
                //console.log(res.data);
                setProduct(res.data);
                console.log(products);
                setLoading(false);
            } catch (err) {
                setError('Error fetching categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    return (
        <div className="container mt-5">
            <h3>Upload Media (Images, Videos, 3D Models)</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                    <label className="form-label">Media Type</label>
                    <select className="form-control" name="type" id="" value={type} onChange={(e) => setType(e.target.value)} >
                        <option >Select Type </option>
                        <option value={'image'} key={'image'}>Image</option>
                        <option value={'video'} key={'video'}>Video</option>
                         <option value={'3D'} key={'3D'}>3D</option>
                       
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product ID</label>
                    <select className="form-control" name="productId" id="" value={productId} onChange={(e) => setProductId(e.target.value)} >
                        <option >Select Product </option>
                        {products.map((prod) =>
                            (<option value={prod._id}>{prod.productname}</option>))}
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
                </div>

                <button type="submit" className="btn btn-primary">Upload Media</button>
            </form>
        </div>
    );
};

export default MediaUploadForm;
