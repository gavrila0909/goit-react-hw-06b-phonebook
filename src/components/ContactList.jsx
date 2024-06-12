// ContactList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getStatusFilter } from '../redux/selectors';
import { deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filtersSlice';
import styles from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getStatusFilter);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleSearchChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h4>Find contacts by name</h4>
      <input
        type="text"
        name="search"
        value={filter}
        onChange={handleSearchChange}
      />

      <ul className={styles.listContainer}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No contacts yet</li>
        )}
      </ul>
    </>
  );
};

export default ContactList;
