import ContactsItem from '../ContactsItem/ContactsItem';
import styles from '../../AppBar/Navigation/navigation.module.css';
import { contactsAPI } from '../../../redux/services';
import { useSelector } from 'react-redux';
import { selectors } from '../../../redux/contacts';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import '@djthoms/pretty-checkbox';
import toast from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';

export default function Contacts() {
  const history = useHistory();
  const location = useLocation();
  const [statusContacts, setStatusContacts] = useState(false);
  const filter = useSelector(selectors.getFilter);
  const token = Cookies.get('token');
  const { data, error, isFetching, isError, isSuccess } =
    contactsAPI.useGetContactsQuery(token);
  const mode = new URLSearchParams(location.search).get('mode') ?? 'read';

  useEffect(() => {
    if (location.search !== '') return;

    history.push({ ...location, search: '' });
  }, [history, location]);

  useEffect(() => {
    if (isError) {
      switch (error.status) {
        case 401:
          toast.error('Error with token.');
          return;
        case 404:
          setStatusContacts(true);
          return;
        case 500:
          toast.error('Something went wrong. Please try again later.');
          return;
        default:
          toast.error('Unknwon error.');
      }
    }

    if (data?.length === 0) {
      setStatusContacts(true);
    } else {
      setStatusContacts(false);
    }
  }, [isError, isFetching]);

  const filteredContacts = () => {
    if (filter) {
      return data.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    return data;
  };

  useEffect(() => {
    if (isSuccess) {
      if (filteredContacts().length === 0)
        toast.error(`You don't have contact with "${filter}".`);
    }
  }, [filter]);

  const clickSwitch = () => {
    if (mode === 'read') {
      history.push({ ...location, search: 'mode=edit' });
    } else {
      history.push({ ...location, search: 'mode=read' });
    }
  };

  return statusContacts ? (
    <p>No contacts.</p>
  ) : (
    <>
      <div className={styles.section}>
        <span className={styles.text}>Read</span>
        <Switch
          checked={mode === 'edit'}
          onClick={clickSwitch}
          color="default"
        />
        <span className={styles.text}>Edit</span>
      </div>
      <ul className={styles.section}>
        {data && !isFetching ? (
          filteredContacts().map(contact => (
            <ContactsItem
              key={contact.id}
              contact={contact}
              edit={mode === 'edit'}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
}