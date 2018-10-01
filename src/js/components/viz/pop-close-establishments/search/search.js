import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchPrevious from 'material-ui/svg-icons/action/search';
import NafSelect from './select-naf';
import EstablishmentSizeSelect from './select-establishment-size';
import DepartmentSelect from './select-department';
import DistanceSelect from './distance';
import D from 'js/i18n';
import './search.css';

export default ({
	nafItem,
	establishmentSize,
	department,
	distance,
	handleChange,
	clickSearch,
}) => (
	<div className="search">
		<div className="mui-row">
			<div className="mui-col-md-6">
				<EstablishmentSizeSelect
					establishmentSize={establishmentSize}
					handleChange={e => handleChange(e, 'establishmentSize')}
				/>
			</div>
			<div className="mui-col-md-6">
				<NafSelect
					nafItem={nafItem}
					handleChange={e => handleChange(e, 'nafItem')}
				/>
			</div>
		</div>
		<div className="mui-row">
			<div className="mui-col-md-6">
				<DepartmentSelect
					department={department}
					handleChange={e => handleChange(e, 'department')}
				/>
			</div>
			<div className="mui-col-md-6">
				<DistanceSelect
					distance={distance}
					handleChange={e => handleChange(e, 'distance')}
				/>
			</div>
		</div>
		<div className="mui-row centered floating-btn search-btn">
			<FloatingActionButton
				disabled={!isToDisable(nafItem, establishmentSize, distance)}
				onClick={clickSearch}
				secondary={true}
			>
				<SearchPrevious />
			</FloatingActionButton>
		</div>
		<Warning
			nafItem={nafItem}
			establishmentSize={establishmentSize}
			distance={distance}
		/>
	</div>
);

const Warning = ({ nafItem, establishmentSize, distance }) =>
	isToDisable(nafItem, establishmentSize, distance) ? null : (
		<h3 className="centered">
			<i>{D.searchSimpleCondition}</i>
		</h3>
	);

const isToDisable = (nafItem, establishmentSize, distance) =>
	distance && (nafItem || establishmentSize);
