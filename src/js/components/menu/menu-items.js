import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';

function MenuItems({ route, title, close }) {
	return (
		<MenuItem
			onClick={close}
			primaryText={title}
			containerElement={<Link to={route} />}
		/>
	);
}

MenuItems.propTypes = {
	route: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	close: PropTypes.func.isRequired,
};
export default MenuItems;
