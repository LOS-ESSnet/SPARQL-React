import { fromJS } from 'immutable';
import MAP_STYLE from 'js/utils/map/mapbox-basic-v9.json';

export const dataLayer = classes =>
	fromJS({
		id: 'data',
		source: 'mySource',
		type: 'fill',
		interactive: true,
		paint: {
			'fill-color': {
				property: 'myClass',
				stops: classes.map((c, i) => [i, c[1]]),
			},
			'fill-opacity': 0.5,
		},
	});

export const defaultMapStyle = fromJS(MAP_STYLE);
