import React from 'react';
import DataTable from 'js/components/shared/table';

export default ({ data, title }) => (
	<div className="mui-row">
		<DataTable title={title} data={data} />
	</div>
);
