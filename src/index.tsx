import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { ArrowButton } from './components/arrow-button/ArrowButton';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type CustomCSSProperties = CSSProperties & {
	'--font-family'?: string;
	'--font-size'?: string;
	'--font-color'?: string;
	'--container-width'?: string;
	'--bg-color'?: string;
};

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [appliedStyles, setAppliedStyles] = useState<CustomCSSProperties>({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	const onApplyStyles = (stylesToApply: CustomCSSProperties) => {
		setAppliedStyles(stylesToApply);
	};

	const handleCloseSidebar = () => {
		setIsSidebarOpen(false);
	};

	return (
		<div className={clsx(styles.main)} style={appliedStyles as CSSProperties}>
			<ArrowButton onClick={handleToggleSidebar} isOpen={isSidebarOpen} />
			<ArticleParamsForm
				isSidebarOpen={isSidebarOpen}
				onApplyStyles={onApplyStyles}
				onClose={handleCloseSidebar}
			/>
			<Article appliedStyles={appliedStyles} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
