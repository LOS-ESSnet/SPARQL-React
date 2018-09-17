import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export default storyFn => (
	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
		<div style={{ marginTop: '50px' }}>{storyFn()}</div>
	</MuiThemeProvider>
);
