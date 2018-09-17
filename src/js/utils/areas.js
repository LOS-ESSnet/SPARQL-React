export const areas = [
	{ id: 'COMMUNE', label: 'Commune' },
	{
		id: 'DEPARTEMENT',
		label: 'Departement',
	},
	{
		id: 'REGION',
		label: 'Region',
	},
];

export const getTypeFromId = id => areas.find(a => a.id === id).type;
