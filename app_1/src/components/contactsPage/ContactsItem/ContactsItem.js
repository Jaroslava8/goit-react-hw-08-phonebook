
import propTypes from 'prop-types';
import { contactsAPI } from '../../../redux/services';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from '../../AppBar/Navigation/navigation.module.css';
import Button from 'react-bootstrap/Button';


export default function ContactsItem({ contact, edit }) {
  const token = Cookies.get('token');
  const [deleteContact, { isError, error, isSuccess, isLoading }] =
    contactsAPI.useDeleteContactMutation();
  const [
    updateContact,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = contactsAPI.useUpdateContactMutation();
  const {
    data,
    isError: isErrorContacts,
    error: errorContacts,
  } = contactsAPI.useGetContactsQuery(token);

  const { id, name, number } = contact;

  useEffect(() => {
    if (isSuccess) {
      toast.success('You deleted contact.');
      return;
    }

    if (isError) {
      switch (error.status) {
        case 401:
          toast.error('Error with token.');
          return;
        case 404:
          toast.error('No user with this name.');
          return;
        case 500:
          toast.error('Something went wrong. Please try again later.');
          return;
        default:
          toast.error('Unknwon error.');
          return;
      }
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.success('You have changed a contact.');
      return;
    }

    if (isErrorUpdate) {
      switch (errorUpdate.status) {
        case 400:
          toast.error('Error with update contact.');
          return;
        case 401:
          toast.error('Error with token.');
          return;
        default:
          toast.error('Unknwon error.');
          return;
      }
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  useEffect(() => {
    if (isErrorContacts) {
      switch (errorContacts.status) {
        case 401:
          toast.error('Error with token');
          return;
        case 404:
          console.log('Not contacts.');
          return;
        case 500:
          toast.error('Something went wrong. Please try again later.');
          return;
        default:
          toast.error('Unknwon error.');
      }
    }
  }, [isErrorContacts]);

  const formik = useFormik({
    initialValues: {
      name: name,
      phone: number,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be 3 characters or more.')
        .max(20, 'Name must be 20 characters or less.'),
      phone: Yup.string().max(20, 'Password must be 20 characters or less.'),
    }),
    onSubmit: ({ name: newName, phone: newPhone }) => {
      if (name === newName && newPhone === number) {
        toast.error('You didn`t edit contact.');
        return;
      }
      if (data.length !== 0) {
        const result = data.find(
          contact => contact.name.toLowerCase() === newName.toLowerCase(),
        );
        if (result) return toast.error('This name is busy.');
      }
      updateContact({
        contact: { name: newName, number: newPhone },
        id,
        token,
      });
    },
  });

  const disabledButton = () => {
    if (
      isLoadingUpdate ||
      formik.values.name === '' ||
      formik.values.phone === '' ||
      formik.errors.phone ||
      formik.errors.name
    )
      return true;
    return false;
  };

  return edit ? (
    <div  className={styles.section}>
    <form onSubmit={formik.handleSubmit}>
  
      <p>
        {formik.values.name === ''
          ? ''
          : formik.errors.name
          ? formik.errors.name
          : ''}
      </p>

      <input
      className={styles.input}
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder="Rosie Simpson"
      />

      <p>
        {formik.values.phone === ''
          ? ''
          : formik.errors.phone
          ? formik.errors.phone
          : ''}
      </p>

      <input
      className={styles.input}
        name="phone"
        type="tel"
        onChange={formik.handleChange}
        value={formik.values.phone}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        placeholder="000-00-00"
      />

      <button className={styles.button} type="submit" disabled={disabledButton()}>
        {isLoadingUpdate ? 'Loading...' : 'Edit'}
      </button>
    </form>
    </div>
  ) : (
    <li>
      <p className={styles.name}>{name}:</p>
      <p className={styles.name}>{number}</p>
      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <button  className={styles.button} type="button" onClick={() => deleteContact({ id, token })}>
       {isLoading ? 'Loading...' : 'Delete'}
      </button>
    </li>
  );
}

ContactsItem.propTypes = {
  contact: propTypes.object.isRequired,
  edit: propTypes.bool.isRequired,
};