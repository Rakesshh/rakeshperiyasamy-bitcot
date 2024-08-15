import React, { useState } from "react";
import "../css/edit_contact.css"; // Import CSS file for styling

export const EditContact = ({ contact, onClose, onUpdateContact }) => {
  // contact object data stored in state
  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    mobile: contact.mobile,
    address: contact.address,
  });

  // updating the state on value change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // on clicking submit , update contact function received from parent component is called
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateContact({ ...contact, ...formData });
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h2>Edit Contact</h2>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} className="popup-body">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Update Contact
        </button>
      </form>
    </div>
  );
};
