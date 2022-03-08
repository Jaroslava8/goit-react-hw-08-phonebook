import FormAddContact from '../contactsPage/FormAddContact/FormAddContact';
import FindContact from '../contactsPage/FindContact/FindContact';
import ContactsList from '../contactsPage/ContactsList/ContactsList';
import styles from './ContactsItem/contactsItem.module.css'

export default function ContactsPage() {
  return (
    <section className={styles.body}>
      <FormAddContact />
      <FindContact />
      <ContactsList />
    </section>
  );
}