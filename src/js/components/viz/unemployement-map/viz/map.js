import React from 'react';
import ColoredMap from 'js/components/shared/map/colored-map';
import { wktToGeojson } from 'js/utils/map/wkt-to-geojson';
import D from 'js/i18n';

export default ({ data, legend }) => {
	const colors = [
		'#F2A4C4',
		'#EF91B6',
		'#EB7EA8',
		'#E76C9B',
		'#E35B8E',
		'#DF4A81',
		'#DB3975',
		'#D72969',
		'#D3195C',
		'#D00B51',
	];
	const geoJsonData = data.map(({ contours, ...d }) => ({
		contours: wktToGeojson(contours),
		...d,
	}));

	const contentArray = [
		[D.department, 'label', ''],
		[D.unemployementTitle, 'value', '%'],
	];

	return (
		<ColoredMap
			data={geoJsonData}
			legend={legend}
			colors={colors}
			contentArray={contentArray}
		/>
	);
};
