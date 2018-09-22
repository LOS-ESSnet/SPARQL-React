import React from 'react';
import Select from 'js/components/shared/select';
import Spinner from 'js/components/shared/spinner';
import dimensionModalitiesConnector from 'js/components/connectors/dimension-modalities';

const DimensionModalitiesSelect = ({
	modality,
	dimensionModalities,
	handleChange,
	offset,
}) => (
	<div className={`mui-col-md-4 mui-col-md-offset-${offset || 1}`}>
		<Select
			label="Select a modality..."
			options={dimensionModalities}
			value={modality}
			onChange={e => handleChange(e, dimensionModalities)}
		/>
	</div>
);

export default dimensionModalitiesConnector(DimensionModalitiesSelect, {
	loading: () => <Spinner text={'Loading...'} />,
});
