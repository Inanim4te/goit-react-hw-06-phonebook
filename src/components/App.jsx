import css from './App.module.css';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from 'redux/filterSlice';
import { addContact, deleteContact } from 'redux/contactsSlice';

export function App() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);

  const handleFilterChange = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  const createContact = (name, number) => {
    if (!contacts.find(el => el.name === name)) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      dispatch(addContact(newContact));
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(e =>
      e.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm createContact={createContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        filteredContacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}
