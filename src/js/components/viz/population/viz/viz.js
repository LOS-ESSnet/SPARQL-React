import React from 'react';
import Tabs from 'js/components/shared/tabs';
import DataTable from 'js/components/shared/table';
import Hints from 'js/components/shared/hints';
import { deleteLabelFromArray, extractLabel } from 'js/utils/array-utils';

export default ({ data }) => {
	const xyData = data.map(({ date, population }) => ({
		x: new Date(date).getTime(),
		y: population,
	}));
	const tabs = [
		{
			label: 'Tableau',
			content: (
				<DataTable
					title={extractLabel(data)}
					data={deleteLabelFromArray(data)}
				/>
			),
		},
		{
			label: 'Graphique',
			content: <Hints data={xyData} xName="Date" yName="Population" />,
		},
	];
	return (
		<div className="mui-row">
			<div className="mui-col-md-12">
				<Tabs tabs={tabs} />
			</div>
		</div>
	);
};
