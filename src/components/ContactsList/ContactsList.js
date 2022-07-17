import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'Redux/API';
import ContactItem from 'components/ContactItem';

const ContactList = () => {
  const { data: contacts } = useGetContactsQuery();
  const filter = useSelector(state => state.filter);

  const contactsFiltration = () => {
    const normalizedFilter = filter.toLowerCase();

    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  return (
    <ul>
      {contacts &&
        contactsFiltration().map(contact => {
          const { id, name, phone } = contact;

          return <ContactItem key={id} id={id} name={name} phone={phone} />;
        })}
    </ul>
  );
};

export default ContactList;
