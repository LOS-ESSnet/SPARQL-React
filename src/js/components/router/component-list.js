import React from 'react';
import * as C from './components';

export const items = [
	{ route: `/`, title: 'Summary', body: <C.Home /> },
	{ title: 'Establishments and populations', type: 'SubHeader' },
	{
		route: `/pop-establishment`,
		title: `Population near an establishment`,
		body: <C.Pop />,
	},
	{ title: 'Permits', type: 'SubHeader' },
	{
		route: `/permits`,
		title: '" Île de France " departements',
		body: <C.Permits />,
	},
	{ title: 'Pop 5', type: 'SubHeader' },
	{
		route: `/population`,
		title: '15 year or more population',
		body: <C.Population />,
	},
	{
		route: `/population-by-dimension`,
		title: 'Departemental population by dimensions',
		body: <C.PopulationByDimensions />,
	},
	{
		route: `/population-departemental-comparisons`,
		title: 'Departemental population structure comparisions',
		body: <C.PopulationDepCompare />,
	},
	{
		route: `/unemployement-map`,
		title: 'Unemployement map',
		body: <C.UnemployementMap />,
	},
];
