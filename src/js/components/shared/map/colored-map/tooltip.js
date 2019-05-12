import React from 'react';
import { prettyNumber } from 'js/utils/pretty-number';

// contentArray contains array like:
// ['label', 'keyName into hoveredFeature.properties', 'units' ]

export default ({ hoveredFeature, x, y, contentArray }) => (
	<div className="tooltip" style={{ left: x, top: y }}>
		{contentArray.map(([label, key, unit], i) => (
			<div key={i}>{`${label}: ${prettyNumber(
				hoveredFeature.properties[key]
			)} ${unit}`}</div>
		))}
	</div>
);
