import React, { Component } from 'react';
import Select from 'js/components/shared/select';
import ContainerRegions from './container-regions';
import ContainerDepartements from './container-departements';
import DepartementSelect from './departement-select';
import { areas } from 'js/utils/areas';
import D from 'js/i18n';

class Main extends Component {
	constructor() {
		super();
		this.state = { type: '' };
		this.handleChangeType = type => this.setState({ type });
	}

	render() {
		const { type } = this.state;
		return (
			<React.Fragment>
				<div className="mui-row loading-row">
					<div className="mui-col-md-5">
						<Select
							label={D.selectGeography}
							options={areas}
							value={type}
							onChange={this.handleChangeType}
						/>
					</div>
					{type === 'COMMUNE' && <DepartementSelect />}
				</div>
				{type === 'DEPARTEMENT' && <ContainerDepartements />}
				{type === 'REGION' && <ContainerRegions />}
			</React.Fragment>
		);
	}
}

export default Main;
