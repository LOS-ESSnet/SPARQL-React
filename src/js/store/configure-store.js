import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

export default function configureStore(mainReducer) {
	return createStore(
		mainReducer,
		undefined,
		compose(
			applyMiddleware(thunkMiddleware, loggerMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);
}
