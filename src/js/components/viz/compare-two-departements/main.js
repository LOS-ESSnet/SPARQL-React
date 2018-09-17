import React, { Component } from 'react';
import DimensionsSelect from 'js/components/shared/dimension-selector/dimensions-select';
import DepartementsSelect from './departements-select';
import Viz from './viz';

class Main extends Component {
	constructor() {
		super();
		this.state = {
			dimension: '',
			depA: '',
			depB: '',
			valueTabs: 0,
		};
		this.handleChangeDimension = dimension => this.setState({ dimension });
		this.handleChangeDepA = (id, deps) =>
			this.setState({
				depA: { id, label: deps.find(d => d.id === id).label },
			});
		this.handleChangeDepB = (id, deps) =>
			this.setState({
				depB: { id, label: deps.find(d => d.id === id).label },
			});
		this.handleChangeTabsValue = valueTabs => this.setState({ valueTabs });
	}

	render() {
		const { dimension, depA, depB, valueTabs } = this.state;
		return (
			<React.Fragment>
				<DimensionsSelect
					dsd="http://id.insee.fr/meta/demo/pop5/dsd/2015-depcomarm"
					excludedDimensions={[
						'http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal',
					]}
					dimA={dimension}
					handleChangeDimA={this.handleChangeDimension}
					hasOneDimensions={true}
				/>
				<DepartementsSelect
					depA={depA.id}
					depB={depB.id}
					handleChangeDepA={this.handleChangeDepA}
					handleChangeDepB={this.handleChangeDepB}
				/>
				{dimension &&
					depA.id &&
					depB.id && (
						<Viz
							dimension={dimension}
							idDepA={depA.id}
							depA={depA}
							idDepB={depB.id}
							depB={depB}
							valueTabs={valueTabs}
							handleChangeTabsValue={this.handleChangeTabsValue}
						/>
					)}
			</React.Fragment>
		);
	}
}

export default Main;
