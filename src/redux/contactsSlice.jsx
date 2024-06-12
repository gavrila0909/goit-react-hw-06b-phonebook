import { createSlice } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

const initialContacts = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact: {
      reducer(state, action) {
        const { id, name, number } = action.payload;
        const existingContact = state.contacts.find(
          contact => contact.name === name
        );
        if (!existingContact) {
          state.contacts.push({ id, name, number });
        } else {
          Notiflix.Notify(`${name} already exists in the list`);
        }
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
