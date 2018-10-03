import React from 'react';
import { Marker } from 'react-map-gl';
import Point from './point';

export default ({ pointCoords, pointContentArray }) => (
	<React.Fragment>
		{pointCoords.map((p, i) => (
			<Marker
				key={i}
				longitude={Number.parseFloat(p.longitude)}
				latitude={Number.parseFloat(p.latitude)}
			>
				<Point
					longitude={Number.parseFloat(p.longitude)}
					latitude={Number.parseFloat(p.latitude)}
					pointContentArray={pointContentArray}
					data={p}
				/>
			</Marker>
		))}
	</React.Fragment>
);
