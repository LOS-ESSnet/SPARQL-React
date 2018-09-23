import D from 'js/i18n';

export const mapMyQuery = year => query => {
	if (!year || year === 'blank') return {};
	return {
		labels: query.filter(({ period }) => period === year).map(m => m.nom),
		datasets: [
			{
				label: D.permits,
				data: query.filter(({ period }) => period === year).map(m => m.permits),
				fill: false,
			},
			{
				label: 'Population',
				borderColor: '#FFA726',
				data: query
					.filter(({ period }) => period === year)
					.map(m => m.popTotale / 1000),
				fill: false,
			},
		],
	};
};
