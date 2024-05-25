import React from 'react'
import { useLocation } from 'react-router-dom';

const Details=()=>{
   const { state } = useLocation();
   const { formData } = state || {};

  return (
    <div className="form-container">
      <h2>Form Details</h2>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Password:</strong> {formData.password}</p>
        <p><strong>PHone Number:</strong>+{formData.phoneCountryCode}-{formData.phoneNumber}</p>
        <p><strong>Country:</strong> {formData.country}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>PanCard Number:</strong> {formData.panNo}</p>
        <p><strong>AadharCard Number:</strong> {formData.aadharNo}</p> 
    </div>
  );
}
export default Details;