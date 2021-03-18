import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactListItem from '../ContactListItem';

import styles from './contactList.module.css';

export default function ContactList ({ contacts, onDeleteContact}) {
    return(
        <TransitionGroup className={styles.list} component="ul">
            {contacts.map(contact => (
                <CSSTransition key={contact.id} timeout={250} classNames={styles}>
                    <li className={styles.item}>
                        <ContactListItem contact={contact} onDeleteContact={onDeleteContact}/>
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
        PropTypes.exact({
          id: PropTypes.string,
        }),
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};