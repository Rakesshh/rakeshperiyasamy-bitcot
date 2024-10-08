import React from "react";
import "../css/contact_view.css"; // Import CSS file for styling

export const ContactView = ({ contact, onClose }) => {
  if (!contact) return null;

  //clicked contact object received in props
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Contact Details</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-body">
          <div className="contact-detail">
            <strong>ID:</strong> <span>{contact.id}</span>
          </div>
          <div className="contact-detail">
            <strong>Name:</strong> <span>{contact.name}</span>
          </div>
          <div className="contact-detail">
            <strong>Mobile:</strong> <span>{contact.mobile}</span>
          </div>
          <div className="contact-detail">
            <strong>Email:</strong> <span>{contact.email}</span>
          </div>
          <div className="contact-detail">
            <strong>Address:</strong> <span>{contact.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
