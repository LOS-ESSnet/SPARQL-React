import React from 'react';
import * as C from './components';
import D from 'js/i18n';

export const items = [
	{ route: `/`, title: D.summary, body: <C.Home /> },
	{ title: D.popEtabSubheader, type: 'SubHeader' },
	{
		route: `/pop-establishment`,
		title: D.popEtabTitle,
		body: <C.Pop />,
	},
	{
		route: `/pop-establishments`,
		title: D.popEtabsTitle,
		body: <C.PopEtabs />,
	},
	{ title: D.permitsSubheader, type: 'SubHeader' },
	{
		route: `/permits`,
		title: D.permitsTitle,
		body: <C.Permits />,
	},
	{ title: 'Pop 5', type: 'SubHeader' },
	{
		route: `/population`,
		title: D.pop5Title,
		body: <C.Population />,
	},
	{
		route: `/population-by-dimension`,
		title: D.popDimensionTitle,
		body: <C.PopulationByDimensions />,
	},
	{
		route: `/population-departemental-comparisons`,
		title: D.popComparisonTitle,
		body: <C.PopulationDepCompare />,
	},
	{
		route: `/unemployement-map`,
		title: D.unemployementTitle,
		body: <C.UnemployementMap />,
	},
];
