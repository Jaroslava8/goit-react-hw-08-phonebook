import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styles from '../../AppBar/Navigation/navigation.module.css';
import { actions } from '../../../redux/contacts';

export default function FindContact() {
  const value = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles.finder}>
      <p className={styles.text}>Find contacts by name</p>
      <input
      className={styles.input}
        type="text"
        name="filter"
        value={value}
        onChange={({ target }) => dispatch(actions.changeFitler(target.value))}
        placeholder='Type contact name'
      />
    </div>
  );
}