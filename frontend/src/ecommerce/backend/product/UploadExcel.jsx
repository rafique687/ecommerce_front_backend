import React, { useState } from 'react';
import axios from 'axios';

const UploadExcel = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert('Please select an Excel file first.');
      return;
    }

    const data = new FormData();
    data.append('file', excelFile);

    try {
      const response = await axios.post(
        'http://192.168.9.115:5000/api/product/import-excel',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Products imported successfully from Excel!');
      } else {
        setMessage('Failed to import products');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error while importing Excel file');
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="excelFile" className="form-label">
        Upload Excel File
      </label>
      <input
        type="file"
        id="excelFile"
        accept=".xlsx,.xls"
        className="form-control"
        onChange={(e) => setExcelFile(e.target.files[0])}
      />
      <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-success" onClick={handleExcelUpload}>
          Import from Excel
        </button>
      </div>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default UploadExcel;
