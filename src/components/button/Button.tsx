import { Text } from 'components/text';

import styles from './Button.module.scss';

interface ButtonProps {
	title: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button: React.FC<ButtonProps> = ({ title, onClick, type }) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
