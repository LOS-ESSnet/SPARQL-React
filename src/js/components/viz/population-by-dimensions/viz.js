import React from 'react';
import Bubble from 'js/components/shared/bubble';
import D from 'js/i18n';

export default ({ data, labelModA, labelModB }) => {
	const xyData = data.map(
		({ label, pop15plusModAModB, partModA, partModB }) => ({
			x: parseFloat(partModA, 10).toFixed(2),
			y: parseFloat(partModB, 10).toFixed(2),
			size: parseInt(pop15plusModAModB, 10),
			label,
		})
	);
	return (
		<Bubble
			data={xyData}
			xName={`${D.partOf} " ${labelModA} "`}
			yName={`${D.partOf} " ${labelModB} "`}
			sizeName="Population"
		/>
	);
};
