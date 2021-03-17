import styles from './alert.module.css';

export default function Alert ({ text }) {
	return (
		<div className={styles.back}>
			<p className={styles.text}>{text}</p>
		</div>
	);
};