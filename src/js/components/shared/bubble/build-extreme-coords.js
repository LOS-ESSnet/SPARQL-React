import { extractFieldFromArray } from 'js/utils/array-utils';

/** Data structure : [{x: '',y: '', size: ''}]
 *
 */
export const buildExtremeCoords = data => {
	const xArray = extractFieldFromArray(data, 'x');
	const yArray = extractFieldFromArray(data, 'y');
	return {
		xMin: Math.min(...xArray),
		xMax: Math.max(...xArray),
		yMin: Math.min(...yArray),
		yMax: Math.max(...yArray),
	};
};
