import React from 'react';
import { Link } from 'react-router-dom';
import { items } from 'js/components/router/component-list';

export default () => (
	<ul>
		{items.map(
			({ route, title }, i) =>
				i !== 0 &&
				(route ? (
					<li key={i} className="item">
						<Link to={route}>{title}</Link>
					</li>
				) : (
					<React.Fragment key={i}>
						<br />
						<h2 className="item-title centered">
							<i>{title}</i>
						</h2>
					</React.Fragment>
				))
		)}
	</ul>
);
