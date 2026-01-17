import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // adjust path as needed

const UserInfo = () => {
  const { ckadmin } = useContext(AuthContext);

  return (
  <div className="row justify-content-end">
  <div className="col-auto">
    <span>Welcome, John</span>
  </div>
</div>
  );
};

export default UserInfo;
