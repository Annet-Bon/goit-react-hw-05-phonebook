import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from "uuid";
// js
import ContactForm from './ContactForm/index';
import Filter from './Filter/index';
import ContactList from './ContactList/index';
import Alert from './Alert/index';
// css
import styles from './app.module.css';
import alertStyles from './Alert/fadeAlert.module.css';
import filterStyles from './Filter/fadeFilter.module.css';

const filterContacts = (contacts, filter) =>
	contacts.filter(contact =>
		contact.name.toLowerCase().includes(filter.toLowerCase()),
	);

export default class App extends Component {
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		filter: PropTypes.string.isRequired,
		error: PropTypes.string.isRequired,
		alert: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		onSubmitData: PropTypes.func.isRequired,
		changeFilter: PropTypes.func.isRequired,
		onDeleteContact: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired,
	};

	state = {
		contacts: [],
		filter: '',
		error: false,
    	alert: '',
	};

	componentDidMount() {
		const localStorageContacts = localStorage.getItem("contacts");

		if (localStorageContacts) {
			this.setState({ contacts: JSON.parse(localStorageContacts) });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { contacts } = this.state;

		if (prevState.contacts !== contacts) {
		  localStorage.setItem('contacts', JSON.stringify(contacts));
		}
	}

	addAlertMessage = text => {
		this.setState({
			error: true,
			alert: text,
		});
		setTimeout(() => this.setState({
			error: false
		}), 1500);
	}

	changeFilter = event => {
		const { value } = event.target;
		this.setState({ filter: value });
	};

	onDeleteContact = id => {
		this.setState({
			contacts: this.state.contacts.filter(contact => contact.id !== id),
		});
	};

	onSubmitData = (data) => {
		const { contacts } = this.state;

		const addContact = {
			id: uuidv4(),
			name: data.name,
			number: data.number,
		};

		if (contacts.some(contact => contact.name === addContact.name)) {
			this.addAlertMessage(`${addContact.name} is already in contacts!`);
		} else {
			this.setState({
				contacts: [...contacts, addContact]
			});
		}
	};

	render() {
		const { contacts, filter, error, alert } = this.state;
		const filteredContacts = filterContacts(contacts, filter);

		return (
			<div>
				<CSSTransition
					in={error}
					classNames={alertStyles}
					timeout={250}
					unmountOnExit
				>
          			<Alert text={alert}/>
        		</CSSTransition>

				<CSSTransition
					in={true}
					appear
					timeout={500}
					classNames={styles}
				>
					<h1 className={styles.title}>Phonebook</h1>
				</CSSTransition>

				<ContactForm onSubmitData={this.onSubmitData} />

				{contacts.length === 0
				? <p className={styles.nothing}>There are no contacts :((</p>
				: (
					<>
						<h2 className={styles.title}>Contacts</h2>

						<CSSTransition
							in={contacts.length > 1}
							timeout={500}
							classNames={filterStyles}
							unmountOnExit
						>
							<Filter value={filter} onChangeFilter={this.changeFilter} />
						</CSSTransition>

						<ContactList contacts={filteredContacts} onDeleteContact={this.onDeleteContact} />
					</>
				)}
			</div>
		);
	}
}