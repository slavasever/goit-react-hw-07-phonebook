import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'Redux/API';
import s from './ContactItem.module.css';

const ContactItem = ({ id, name, phone }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <li className={s.item}>
      <p className={s.text}>
        - {name}: {phone}
      </p>
      <button
        type="button"
        className={s.button}
        disabled={isDeleting}
        onClick={() => {
          deleteContact(id);
        }}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default ContactItem;
