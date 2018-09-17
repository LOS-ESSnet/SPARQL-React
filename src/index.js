import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'js/components/router';
import registerServiceWorker from './registerServiceWorker';
import './app.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
