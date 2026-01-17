import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white text-center py-3 fixed-bottom"  style={{ backgroundColor: '#ccc', marginTop: '60px'}}>
      <p className="mb-0">© {new Date().getFullYear()} All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
