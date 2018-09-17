import React from 'react';
import { SelectField } from 'material-ui';
import { MenuItem } from 'material-ui';

function Select({ label, options, value, onChange, multiple }) {
	const labelStyle = {
		color: 'black',
	};
	const style = {
		color: 'black',
		width: '90%',
		marginBottom: '20px',
		paddingLeft: '15px',
	};
	const data = options.map(({ id, label }) => (
		<MenuItem
			key={id}
			value={id}
			primaryText={label}
			checked={value ? value.includes(id) : false}
		/>
	));

	return (
		<div>
			<div className="mui-row">
				<h2 className="mui-col-md-12">{label}</h2>
				<SelectField
					multiple={multiple}
					value={value}
					onChange={(e, k, value) => onChange(value)}
					style={style}
					labelStyle={labelStyle}
				>
					{data}
				</SelectField>
			</div>
		</div>
	);
}

export default Select;
