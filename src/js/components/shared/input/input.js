import React from 'react';
import { TextField } from 'material-ui';

function Input({
	id,
	label,
	value,
	onChange,
	required,
	error,
	disabled,
	col,
	titleCenter,
}) {
	const inputStyle = {
		color: 'black',
	};
	const style = {
		width: '90%',
	};

	const requiredText = value || !required ? '' : 'This field is required';
	const errorText = error ? 'Error' : '';

	return (
		<div className={`mui-col-md-${col}`}>
			<div className="mui-row">
				<h2 className={`mui-col-md-12 ${titleCenter && 'centered'}`}>
					{label}
				</h2>
			</div>
			<div className="mui-row">
				<TextField
					className="mui-col-md-12"
					id={id}
					style={style}
					inputStyle={inputStyle}
					value={value}
					onChange={e => onChange(e.target.value)}
					disabled={disabled}
					errorText={requiredText || errorText}
				/>
			</div>
		</div>
	);
}

export default Input;
