import React from 'react';
import D from 'js/i18n';
import { buildLegend } from './build-map';
import './legend.css';

const Legend = ({ classes, legend: { title, body } }) => (
	<div className="legend-container">
		<h3>{title}</h3>
		<p>{body}</p>
		<p>{`${D.dataSource} : Insee`}</p>
		<hr />
		<div>{buildLegend(classes)}</div>
	</div>
);

export default Legend;
