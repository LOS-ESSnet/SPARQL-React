import React, { Component } from 'react';
import Select from 'js/components/shared/select';
import Spinner from 'js/components/shared/spinner';
import VizCommunes from './container-communes';
import departementsConnector from 'js/components/connectors/departements';
import D from 'js/i18n';

class DepartementSelect extends Component {
	constructor() {
		super();
		this.state = { departement: '' };
		this.handleChangeType = departement => this.setState({ departement });
	}

	render() {
		const { departements } = this.props;
		const { departement } = this.state;
		return (
			<React.Fragment>
				<div className="mui-row loading-row">
					<div className="mui-col-md-5 mui-col-md-offset-1">
						<Select
							label={D.municipalityIntoDepartment}
							options={departements}
							value={departement}
							onChange={this.handleChangeType}
						/>
					</div>
				</div>
				{departement && <VizCommunes departement={departement} />}
			</React.Fragment>
		);
	}
}

export default departementsConnector(DepartementSelect, {
	loading: () => <Spinner text={D.loading} />,
});
