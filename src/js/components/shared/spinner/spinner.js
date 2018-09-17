import React from 'react';
import ReactLoading from 'react-loading';
import './spinner.css';
import 'app.css';

export default ({ text }) => (
	<React.Fragment>
		<ReactLoading
			type="spinningBubbles"
			delay={0}
			color="#ee3467"
			height={300}
			width={300}
			className="loading"
		/>
		<h2 className="loading-color">{text}</h2>
	</React.Fragment>
);
