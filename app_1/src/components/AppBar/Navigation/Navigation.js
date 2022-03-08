import { Link } from 'react-router-dom';
import styles from '../Navigation/navigation.module.css'
import propTypes from 'prop-types';



export default function Navigation({ loggined }) {
  return (
    <div className={styles.header}>
  
 
      {loggined ? (
        <Link className={styles.contacts} to="/contacts">Contacts</Link>
      ) : (
        <>
          <Link to="register" className={styles.sign}>Sign up</Link>
          <Link to="login" className={styles.sign}>Log in</Link>
        </>
      )}
    </div>
  );
}

Navigation.propTypes = {
  loggined: propTypes.bool.isRequired,
};