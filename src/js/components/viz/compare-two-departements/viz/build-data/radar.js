import { sum } from 'js/utils/array-utils';
import { radarColors } from 'js/utils/prime-colors';

export const buildRadarData = (data, depA, depB) => ({
	labels: data.filter(d => d.dep === depA.id).map(d => d.dimLabel),
	datasets: [
		{
			label: depA.label,
			backgroundColor: radarColors[0][0],
			borderColor: radarColors[0][1],
			pointBackgroundColor: radarColors[0][1],
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: radarColors[0][1],
			data: buildData(data, depA.id),
		},
		{
			label: depB.label,
			backgroundColor: radarColors[1][0],
			borderColor: radarColors[1][1],
			pointBackgroundColor: radarColors[1][1],
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: radarColors[1][1],
			data: buildData(data, depB.id),
		},
	],
});

const buildData = (data, depId) => {
	const subDataDep = data.filter(d => d.dep === depId);
	const sumData = sum(subDataDep.map(d => d.popByDim));
	return subDataDep.reduce((_, d) => {
		_.push(parseFloat((d.popByDim / sumData) * 100, 10).toFixed(2));
		return _;
	}, []);
};
