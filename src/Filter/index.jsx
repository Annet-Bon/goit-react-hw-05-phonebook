import PropTypes from 'prop-types';

import styles from './filter.module.css';

export default function Filter ({ value, onChangeFilter }) {
    return (
        <div className={styles.filter}>
            <p className={styles.title}>Find contacts by name</p>
            <input className={styles.filterInput} name="filter" onChange={onChangeFilter} value={value}/>
        </div>
    );
};

Filter.propTypes = {
	value: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
};