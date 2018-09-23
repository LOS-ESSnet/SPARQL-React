import React from 'react';
import Tabs from 'js/components/shared/tabs';
import { Chart } from 'primereact/chart';
import * as B from './build-data';
import D from 'js/i18n';

export default ({ data, depA, depB, valueTabs, handleChangeTabsValue }) => {
	const tabs = [
		{
			label: 'Doughnut',
			content: (
				<div className="mui-row">
					<div className="mui-col-md-6">
						<Chart type="doughnut" data={B.buildDoughnutData(data, depA.id)} />
					</div>
					<div className="mui-col-md-6">
						<Chart type="doughnut" data={B.buildDoughnutData(data, depB.id)} />
					</div>
				</div>
			),
		},
		{
			label: 'Radar',
			content: (
				<div className="mui-row">
					<div className="mui-col-md-12">
						<Chart type="radar" data={B.buildRadarData(data, depA, depB)} />
					</div>
				</div>
			),
		},
		{
			label: D.stackedBar,
			content: (
				<div className="mui-row">
					<div className="mui-col-md-12">
						<Chart
							type="bar"
							data={B.buildStackedBarData(data, [depA, depB])}
							options={B.stackedOptions}
						/>
					</div>
				</div>
			),
		},
	];
	return (
		<Tabs
			tabs={tabs}
			value={valueTabs}
			handleChangeTabsValue={handleChangeTabsValue}
		/>
	);
};
