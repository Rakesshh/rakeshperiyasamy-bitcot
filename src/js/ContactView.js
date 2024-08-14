import React from "react";
import "../css/contact_view.css"; // Import CSS file for styling

export const ContactView = ({ contact, onClose }) => {
  if (!contact) return null;

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
        </div>
      </div>
    </div>
  );
};

// const createMask = (contact) => {
//   // Create the mask element
//   const mask = document.createElement("div");
//   mask.className = "mask";
//   mask.style.position = "fixed";
//   mask.style.top = "0";
//   mask.style.left = "0";
//   mask.style.width = "100vw";
//   mask.style.height = "100vh";
//   mask.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // semi-transparent black
//   mask.style.zIndex = "1000";
//   mask.style.cursor = "pointer";
//   document.body.appendChild(mask);
// };
