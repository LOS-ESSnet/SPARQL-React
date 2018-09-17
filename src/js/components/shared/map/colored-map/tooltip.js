import React from 'react';

// contentArray contains array like:
// ['label', 'keyName into hoveredFeature.properties', 'units' ]

export default ({ hoveredFeature, x, y, contentArray }) => (
	<div className="tooltip" style={{ left: x, top: y }}>
		{contentArray.map(([label, key, unit], i) => (
			<div key={i}>{`${label}: ${hoveredFeature.properties[key]} ${unit}`}</div>
		))}
	</div>
);
