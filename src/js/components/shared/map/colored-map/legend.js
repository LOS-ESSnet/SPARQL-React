import React from 'react';
import { buildLegend } from './build-map';
import './legend.css';

export default ({ classes, legend: { title, body } }) => (
	<div className="legend-container">
		<h3>{title}</h3>
		<p>{body}</p>
		<p>
			Data source:{' '}
			<a href="https://www.insee.fr" target="_blank" rel="noopener noreferrer">
				Insee
			</a>
		</p>
		<hr />
		<div>{buildLegend(classes)}</div>
	</div>
);
