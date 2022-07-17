import { useGetContactsQuery, useAddContactMutation } from 'Redux/API';
import { toast } from 'react-toastify';
import s from './ContactForm.module.css';

function ContactForm() {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading: addition }] = useAddContactMutation();

  const submitHandler = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.elements.name.value;
    const phone = form.elements.number.value;
    const contact = { name, phone };

    const isContactInList =
      contacts &&
      contacts.some(item => item.name.toLowerCase() === name.toLowerCase());

    if (isContactInList) {
      toast.warning(`"${contact.name}" is already in contacts!`);
      return;
    }
    addContact(contact);
    form.reset();
  };

  return (
    <form onSubmit={submitHandler} className={s.form}>
      <label htmlFor="name" className={s.label}>
        Name
      </label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        className={s.input}
      />

      <label htmlFor="number" className={s.label}>
        Number
      </label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        className={s.input}
      />

      <button type="submit" className={s.button}>
        {addition ? 'Addition...' : 'Add contact'}
      </button>
    </form>
  );
}

export default ContactForm;
