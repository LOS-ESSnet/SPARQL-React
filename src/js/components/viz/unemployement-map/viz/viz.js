import React from 'react';
import Map from './map';
import D from 'js/i18n';

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
		title: D.unemployement,
		body: D.unemployementDescription,
	};

	return (
		<div className="mui-row">
			<div className="mui-col-md-12">
				<Map data={mapData} legend={legend} />
			</div>
		</div>
	);
};
