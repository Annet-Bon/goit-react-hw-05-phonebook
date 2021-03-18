import PropTypes from 'prop-types';
import styles from './alert.module.css';

export default function Alert ({ text }) {
	return (
		<div className={styles.back}>
			<p className={styles.text}>{text}</p>
		</div>
	);
};

Alert.propTypes = {
	message: PropTypes.string,
};