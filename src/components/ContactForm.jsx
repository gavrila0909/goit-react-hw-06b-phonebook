// ContactForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../redux/selectors';
import { addContact } from '../redux/contactsSlice';
import Notiflix from 'notiflix';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', number: '' });
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = formData;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }
    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      Notiflix.Notify.failure(`${name} already exists in the list`);
      return;
    }
    dispatch(addContact(name, number));
    setFormData({ name: '', number: '' });
  };

  const handleInputChange = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setFormData({ ...formData, [inputName]: inputValue });
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleInputChange}
        pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number:</label>
      <input
        type="tel"
        id="number"
        name="number"
        value={formData.number}
        onChange={handleInputChange}
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
