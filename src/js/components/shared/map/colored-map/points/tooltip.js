import React from 'react';
import './tooltip.css';

// contentArray contains array like:
// ['label', 'keyName into hoveredFeature.properties', 'units' ]

export default ({ data, longitude, latitude, pointContentArray }) => (
	<div className="tooltip-point" style={{ left: longitude, top: latitude }}>
		{pointContentArray.map(([label, key, unit], i) => (
			<div key={i}>{`${label}: ${data[key]} ${unit}`}</div>
		))}
	</div>
);
