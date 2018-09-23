import D from 'js/i18n';

export const areas = [
	{ id: 'COMMUNE', label: D.municipality },
	{
		id: 'DEPARTEMENT',
		label: D.department,
	},
	{
		id: 'REGION',
		label: D.region,
	},
];

export const getTypeFromId = id => areas.find(a => a.id === id).type;
