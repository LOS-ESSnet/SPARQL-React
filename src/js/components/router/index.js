import React from 'react';
import configureStore from 'js/store/configure-store';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Menu from 'js/components/menu';
import PagesRoutes from './routes';
import { getReducer, setQueryURL } from 'sparql-connect';
import config from 'config';
import { items } from 'js/components/router/component-list';

setQueryURL(config.POP5_ENDPOINT);
const store = configureStore(getReducer());

export default () => (
	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
		<Provider store={store}>
			<Router>
				<div>
					<Menu items={items} />
					<Switch>
						<PagesRoutes />
						/>
					</Switch>
				</div>
			</Router>
		</Provider>
	</MuiThemeProvider>
);
