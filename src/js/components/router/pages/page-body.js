import React from 'react';
import PropTypes from 'prop-types';

function PageBody({ body }) {
	return <div className="mui-row slide-text">{body}</div>;
}

PageBody.propTypes = {
	body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default PageBody;
