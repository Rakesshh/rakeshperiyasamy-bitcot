import React, { useState } from "react";
import "../css/add_contact.css"; // Import CSS file for styling

export const AddContact = ({ onClose, onAddContact }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  // setting the changed values in state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // onClicking submit , onAddContact is called which is passed from Parent component
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContact(formData);
    onClose();
  };

  return (
    <div className="popup-add-container">
      <div className="popup-header">
        <h2>Add Contact</h2>
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
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Contact
        </button>
      </form>
    </div>
  );
};
