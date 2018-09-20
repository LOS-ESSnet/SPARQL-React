import React from 'react';
import NafSelect from './naf-select';
import Input from 'js/components/shared/input';

export default ({ nafItem, search, handleChange }) => (
	<div className="mui-row">
		<div className="mui-col-md-6">
			<NafSelect
				nafSelect={nafItem.id}
				handleChange={e => handleChange(e, 'nafItem')}
			/>
		</div>
		<div className="mui-col-md-6">
			<Input
				id="my-search"
				label="Establishment name search ... (3 characters at least)"
				value={search}
				onChange={e => handleChange(e, 'search')}
			/>
		</div>
	</div>
);
