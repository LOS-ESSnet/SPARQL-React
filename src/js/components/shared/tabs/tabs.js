import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as TabsMui, Tab } from 'material-ui/Tabs';

function Tabs({ tabs, value, handleChangeTabsValue }) {
	const style = {
		backgroundColor: '#ee3467',
		fontWeight: 'bold',
		color: '#FFFFFF',
		selectedBackgroundColor: '#FFFFFF',
	};
	const tabElements = tabs.map(({ label, content }, i) => (
		<Tab key={label} label={label} style={style} value={i}>
			{content}
		</Tab>
	));
	return (
		<TabsMui
			inkBarStyle={{ background: 'blue', marginBottom: '40px' }}
			value={value}
			onChange={handleChangeTabsValue}
		>
			{tabElements}
		</TabsMui>
	);
}

Tabs.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			content: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
				.isRequired,
		})
	).isRequired,
	value: PropTypes.number.isRequired,
	handleChangeTabsValue: PropTypes.func.isRequired,
};

export default Tabs;
