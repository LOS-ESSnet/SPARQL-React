import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import D from 'js/i18n';
import './select-rmes.css';

function SelectRmes({
	value,
	placeholder,
	options,
	onChange,
	isClearable,
	searchable,
	multi,
	disabled,
}) {
	const onChangeSelect = multi
		? e => onChange(e)
		: e => onChange(e ? e.value : '');
	return (
		<Select
			value={value}
			placeholder={placeholder}
			options={options}
			onChange={onChangeSelect}
			isClearable={isClearable}
			searchable={searchable}
			noResultsText={D.noResult}
			multi={multi}
			disabled={disabled}
		/>
	);
}

SelectRmes.defaultProps = {
	multi: false,
	isClearable: true,
	searchable: true,
	disabled: false,
};

SelectRmes.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array,
		PropTypes.object,
	]).isRequired,
	placeholder: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	onChange: PropTypes.func.isRequired,
	isClearable: PropTypes.bool,
	searchable: PropTypes.bool,
	creatable: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default SelectRmes;
