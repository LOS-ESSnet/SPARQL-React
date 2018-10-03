import React from 'react';
import ReactSelect from 'js/components/shared/react-select';
import D from 'js/i18n';

const d = ['1', '2', '3', '5', '10'];
const dList = d.map(d => ({ value: d, label: `${d} km` }));

export default ({ distance, handleChange }) => (
	<div>
		<h2 className="centered">{D.distanceTitle}</h2>
		<ReactSelect
			placeholder={D.selectDistance}
			options={dList}
			value={distance ? dList.find(d => d.value === distance) : ''}
			onChange={handleChange}
			searchable={true}
			unclearable={false}
		/>
	</div>
);
