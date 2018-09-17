import React from 'react';
import Map from './map';

export default ({ data }) => {
	const mapData = data.map(({ label, activePop, unemployedPop, contours }) => ({
		label,
		myIndicator: (
			(parseFloat(unemployedPop, 10) / parseFloat(activePop, 10)) *
			100
		).toFixed(2),
		contours,
	}));

	const legend = {
		title: 'Unemployement',
		body:
			'Map represents unemployement rate of 15 old years and more by departement',
	};

	return (
		<div className="mui-row">
			<div className="mui-col-md-12">
				<Map data={mapData} legend={legend} />
			</div>
		</div>
	);
};
