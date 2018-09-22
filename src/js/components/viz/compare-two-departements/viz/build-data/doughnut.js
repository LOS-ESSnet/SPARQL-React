import { sum } from 'js/utils/array-utils';
import { backgroundColor, hoverBackgroundColor } from 'js/utils/prime-colors';

export const buildDoughnutData = (data, depId) => {
	const defaultDoughnut = {
		labels: [],
		datasets: [
			{
				data: [],
				backgroundColor,
				hoverBackgroundColor,
			},
		],
	};
	const subDataDep = data.filter(d => d.dep === depId);
	const sumData = sum(subDataDep.map(d => d.popByDim));
	return subDataDep.reduce(
		(_, d) => {
			_.labels.push(d.dimLabel);
			_.datasets[0].data.push(
				parseFloat((d.popByDim / sumData) * 100, 10).toFixed(2)
			);
			return _;
		},
		{...defaultDoughnut }
	);
};
