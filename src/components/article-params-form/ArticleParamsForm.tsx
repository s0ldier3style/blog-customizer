import { Button } from 'components/button';
import clsx from 'clsx';
import { Select } from '../select';
import { useState, useRef } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { CustomCSSProperties } from '../../index';
import { useClose } from './UseClose';

interface ArticleParamsFormProps {
	isSidebarOpen: boolean;
	onApplyStyles: (stylesToApply: CustomCSSProperties) => void;
	onClose: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isSidebarOpen,
	onApplyStyles,
	onClose,
}) => {
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const handleFormClick = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	const handleApplyStyles = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const stylesToApply: CustomCSSProperties = {
			'--font-family': selectedFont.value,
			'--font-size': selectedFontSize.value,
			'--font-color': selectedFontColor.value,
			'--container-width': selectedContentWidth.value,
			'--bg-color': selectedBackgroundColor.value,
		};
		onApplyStyles(stylesToApply);
	};

	const handleReset = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	const sidebarRef = useRef<HTMLElement>(null);

	useClose({ isOpen: isSidebarOpen, onClose, rootRef: sidebarRef });

	return (
		<aside
			ref={sidebarRef}
			className={clsx(styles.container, {
				[styles.container_open]: isSidebarOpen,
			})}
			onClick={handleFormClick}>
			<form className={styles.form}>
				<h1 className={styles.title}>Задайте параметры</h1>
				<Select
					title='Шрифт'
					options={fontFamilyOptions}
					selected={selectedFont}
					onChange={setSelectedFont}
				/>
				<RadioGroup
					name='font-size'
					options={fontSizeOptions}
					selected={selectedFontSize}
					onChange={setSelectedFontSize}
					title='Размер шрифта'
				/>
				<Select
					title='Цвет шрифта'
					options={fontColors}
					selected={selectedFontColor}
					onChange={setSelectedFontColor}
				/>
				<Separator />
				<Select
					title='Цвет фона'
					options={backgroundColors}
					selected={selectedBackgroundColor}
					onChange={setSelectedBackgroundColor}
				/>
				<Select
					title='Ширина контента'
					options={contentWidthArr}
					selected={selectedContentWidth}
					onChange={setSelectedContentWidth}
				/>
				<div className={styles.bottomContainer}>
					<Button title='Сбросить' type='reset' onClick={handleReset} />
					<Button title='Применить' type='submit' onClick={handleApplyStyles} />
				</div>
			</form>
		</aside>
	);
};
