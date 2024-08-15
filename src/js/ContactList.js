import { useEffect, useState, useRef } from "react";
import "../css/contact.css";
import ReactDOM from "react-dom";
import Mask from "./Mask";
import eyeImg from "../images/eye.png";
import trashImg from "../images/trash.jpg";
import editImg from "../images/edit.png";
import profileImg from "../images/profileicon.jpg";
import { AddContact } from "./AddContact";
import { ContactView } from "./ContactView";
import { EditContact } from "./EditContact";
export function ContactList() {
  const [contactList, setContactList] = useState([]);
  const [searchContactList, setSearchContactList] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const searchValue = useRef();

  useEffect(() => {
    // fetching the json from given url
    fetch(
      "https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json"
    )
      .then((resp) => {
        return resp.json();
      })
      .then((responseValue) => {
        // setting the response in contactlist state
        setContactList(responseValue);
      });
  }, []);

  // triggering search contact on input value change
  const handleOnChange = (event) => {
    // trim the blank spaces in start and end
    searchValue.current = event.target.value.trim();
    const valueLowerCase = searchValue.current.toLowerCase();
    const matchContacts = contactList.filter((contact) => {
      return (
        contact.name.toLowerCase().startsWith(valueLowerCase) ||
        contact.mobile.startsWith(valueLowerCase)
      );
    });
    // setting the matched contacts in search contact list
    setSearchContactList(matchContacts);
  };

  // function to delete the contact
  const handleDelete = (contact) => {
    // deleting the contact in contactlist state
    const contactListIndex = contactList.findIndex((obj) => {
      return obj.id === contact.id;
    });
    const contactListCopy = contactList.slice(0);
    contactListCopy.splice(contactListIndex, 1);
    setContactList(contactListCopy);

    // deleting the contact in searchcontact list state
    const searchContactListIndex = searchContactList.findIndex((obj) => {
      return obj.id === contact.id;
    });
    const searchContactListCopy = searchContactList.slice(0);
    searchContactListCopy.splice(searchContactListIndex, 1);
    setSearchContactList(searchContactListCopy);
  };

  // if search value is set, searchcontactlist will be returned else contactlist will be returned
  const getContactList = () => {
    if (searchValue.current) {
      return searchContactList;
    }
    return contactList;
  };

  const triggerViewPopup = (contact) => {
    // setting the currently clicked contact in currentContact state
    setCurrentContact(contact);
    // set the showviewpop state to trigger view popup
    setShowViewPopup(true);
  };

  // resetting the current contact state and set showviewpopup as false
  const closeViewPopup = () => {
    setShowViewPopup(false);
    setCurrentContact(null);
  };

  // setting the currently clicked contact in currentContact state
  const triggerEditPopup = (contact) => {
    setCurrentContact(contact);
    setShowEditPopup(true);
  };

  // updated contact value is set in contactlist state and searchcontactlist state
  const handleEditContact = (updatedContact) => {
    const updatedContactList = contactList.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContactList(updatedContactList);
    const updatedSearchContactList = searchContactList.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setSearchContactList(updatedSearchContactList);
  };

  // resetting the current contact state and set showeditpopup as false
  const closeEditPopup = () => {
    setShowEditPopup(false);
    setCurrentContact(null);
  };

  // setting showaddpopup state as true, renders add pop up along with mask
  const triggerAddPopup = () => {
    setShowAddPopup(true);
  };

  // function to add contact in existing contactlist
  const handleAddContact = (newContact) => {
    const contactListCopy = contactList.slice(0);
    newContact.id = contactListCopy.length + 1;
    contactListCopy.push(newContact);
    setContactList(contactListCopy);
  };

  // set showaddpopup as false
  const closeAddPopup = () => {
    setShowAddPopup(false);
  };

  return (
    <>
      {/* Append the Mask component to the body */}
      {showViewPopup &&
        ReactDOM.createPortal(
          <>
            <Mask onClick={closeViewPopup} />
            <ContactView contact={currentContact} onClose={closeViewPopup} />
          </>,
          document.body
        )}
      {showAddPopup &&
        ReactDOM.createPortal(
          <>
            <Mask onClick={closeAddPopup} />
            <AddContact
              onAddContact={handleAddContact}
              onClose={closeAddPopup}
            />
          </>,
          document.body
        )}
      {showEditPopup &&
        ReactDOM.createPortal(
          <>
            <Mask onClick={closeEditPopup} />
            <EditContact
              onUpdateContact={handleEditContact}
              onClose={closeEditPopup}
              contact={currentContact}
            />
          </>,
          document.body
        )}
      <div className="contact_container">
        <div className="contact_header">
          <span className="contact_header_text">All Contacts </span>
          <div className="circle" onClick={triggerAddPopup}>
            <span className="plus">+</span>
          </div>
        </div>
        <div className="contact_search">
          <input placeholder="Search Contact" onChange={handleOnChange}></input>
        </div>
        <div className="contact_list">
          {getContactList().map((contact) => {
            return (
              <div className="contact_item">
                <div className="contact_id">
                  <span>{contact.id}</span>
                </div>
                <div className="contact-card">
                  <img className="profileIcon" src={profileImg}></img>
                  <div>
                    <span>{contact.name}</span>
                    <span>{contact.mobile}</span>
                  </div>
                </div>
                <span className="icons-container">
                  <img
                    className="contact_icon"
                    src={eyeImg}
                    onClick={() => {
                      triggerViewPopup(contact);
                    }}
                  ></img>
                  <img
                    className="contact_icon"
                    alt="trash"
                    src={trashImg}
                    onClick={() => {
                      handleDelete(contact);
                    }}
                  ></img>
                  <img
                    className="contact_icon"
                    src={editImg}
                    onClick={() => {
                      triggerEditPopup(contact);
                    }}
                  ></img>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
