import React from 'react';
import { Route } from 'react-router-dom';
import { items } from './component-list';
import Page from 'js/components/router/pages/page';

export default () => (
	<div>
		{items.map(
			({ route, title, body, type }) =>
				type === 'SubHeader' ? null : (
					<Route
						key={route}
						exact
						path={route}
						component={() => <Page title={title} body={body} route={route} />}
					/>
				)
		)}
	</div>
);
