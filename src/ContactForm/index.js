import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './contactForm.module.css';

export default class ContactForm extends Component {
    static propTypes = {
		name: PropTypes.string.isRequired,
		number: PropTypes.number.isRequired,
		onChange: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

    state = {
        name: '',
        number: '',
    };

    onChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const { name, number } = this.state;

        if (!name || !number) {
            return;
          }
        this.props.onSubmitData ({ ...this.state });
        this.reset();
    }

    reset () {
        this.setState({
            name: '',
            number: '',
        });
    }

    render() {
        const { name, number } = this.state;

        return (
              <form onSubmit={this.onSubmit} className={styles.form}>
                <label className={styles.label}>
                    <span className={styles.title}>Name</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.onChange}
                    />
                </label>

                <label className={styles.label}>
                    <span className={styles.title}>Number</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="number"
                        value={number}
                        onChange={this.onChange}
                    />
                </label>

                <button type="submit" className={styles.btn}>Add new contact</button>
            </form>
        );
    }
}