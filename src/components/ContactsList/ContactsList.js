import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'Redux/API';
import ContactItem from 'components/ContactItem';
import Loader from 'components/Loader';

const ContactList = () => {
  const { data: contacts, isFetching } = useGetContactsQuery();
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
    <>
      {contacts &&
        (contacts.length === 0 ? (
          <p className="placeholder">Add your first contact!</p>
        ) : (
          <ul>
            {contactsFiltration().map(contact => {
              const { id, name, phone } = contact;

              return <ContactItem key={id} id={id} name={name} phone={phone} />;
            })}
          </ul>
        ))}
      {isFetching && <Loader />}
    </>
  );
};

export default ContactList;

// {
//   contacts.length === 0 ? (
//     <div>There are no contacts here yet</div>
//   ) : (
//     <ul>
//       {filteredContacts.map(contact => {
//         const { id, name, phone } = contact;

//         return <ContactItem key={id} id={id} name={name} phone={phone} />;
//       })}
//     </ul>
//   );
// }
