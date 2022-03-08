import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userAPI } from '../../redux/services';
import { useEffect } from 'react';
import { actions } from '../../redux/user';
import { useDispatch } from 'react-redux';
import styles from '../AppBar/Navigation/navigation.module.css';
import { Button } from 'react-bootstrap';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [login, { data, isError, isLoading, isSuccess, error }] =
    userAPI.useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('You are loggined.');
      Cookies.set('token', data.token);
      dispatch(actions.authUser(data));
      return;
    }

    if (isError) {
      switch (error.status) {
        case 400:
          return toast.error('Incorrect email or password.');
        default:
          return toast.error('Unknworn error.');
      }
    }
  }, [isError, isSuccess]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address.'),
      password: Yup.string()
        .min(7, 'Password must be 7 characters or more.')
        .max(20, 'Password must be 20 characters or less.'),
    }),
    onSubmit: values => {
      login(values);
    },
  });

  const disabledButton = () => {
    if (
      isLoading ||
      formik.values.email === '' ||
      formik.values.password === '' ||
      formik.errors.password ||
      formik.errors.email
    )
      return true;
    return false;
  };

  return (
    <form className={styles.body} onSubmit={formik.handleSubmit}>
      <p>
        {formik.values.email === ''
          ? ''
          : formik.errors.email
          ? formik.errors.email
          : ''}
      </p>

      <input
      className={styles.input}
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder="rosierosie@gmail.com"
      />

      <p >
        {formik.values.password === ''
          ? ''
          : formik.errors.password
          ? formik.errors.password
          : ''}
      </p>

      <input
         className={styles.input}
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder="rosie123"
      />

      <button className={styles.button} type="submit" disabled={disabledButton()}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
 
    </form>
  );
}