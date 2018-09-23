import React from 'react';
import Select from 'js/components/shared/select';
import Spinner from 'js/components/shared/spinner';
import departementsConnector from 'js/components/connectors/departements';
import D from 'js/i18n';

const DepartementsSelect = ({
	departements,
	depA,
	depB,
	handleChangeDepA,
	handleChangeDepB,
}) => {
	return (
		<div className="mui-row">
			<div className="mui-col-md-4 mui-col-md-offset-1">
				<Select
					label={D.fixFirstDepartment}
					options={departements.filter(d => d.id !== depB)}
					value={depA}
					onChange={e => handleChangeDepA(e, departements)}
				/>
			</div>
			<div className="mui-col-md-4 mui-col-md-offset-2">
				<Select
					label={D.fixSecondDepartment}
					options={departements.filter(d => d.id !== depA)}
					value={depB}
					onChange={e => handleChangeDepB(e, departements)}
				/>
			</div>
		</div>
	);
};

export default departementsConnector(DepartementsSelect, {
	loading: () => <Spinner text={D.loading} />,
});
