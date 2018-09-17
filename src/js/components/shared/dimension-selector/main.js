import React, { Component } from 'react';
import DimensionsSelect from './dimensions-select';
import DimensionModalitiesSelect from './dimension-modalities-select';

const hocDimensionSelector = WrappedComponent => {
	class Main extends Component {
		constructor() {
			super();
			this.state = {
				dimA: '',
				dimB: '',
				modA: '',
				modB: '',
				labelModA: '',
				labelModB: '',
			};
			this.handleChangeDimA = dimA =>
				this.setState({ dimA, modA: '', labelModA: '' });
			this.handleChangeDimB = dimB =>
				this.setState({ dimB, modB: '', labelModB: '' });
			this.handleChangeModA = (modA, modalities) =>
				this.setState({
					modA,
					labelModA: modalities.find(m => m.id === modA).label,
				});
			this.handleChangeModB = (modB, modalities) =>
				this.setState({
					modB,
					labelModB: modalities.find(m => m.id === modB).label,
				});
		}

		render() {
			const { dimA, dimB, modA, modB, labelModA, labelModB } = this.state;
			return (
				<React.Fragment>
					<DimensionsSelect
						dsd="http://id.insee.fr/meta/demo/pop5/dsd/2015-depcomarm"
						excludedDimensions={[
							'http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal',
						]}
						dimA={dimA}
						dimB={dimB}
						handleChangeDimA={this.handleChangeDimA}
						handleChangeDimB={this.handleChangeDimB}
					/>
					<div className="mui-row loading-row">
						{dimA && (
							<DimensionModalitiesSelect
								dimension={dimA}
								modality={modA}
								handleChange={this.handleChangeModA}
							/>
						)}
						{dimB && (
							<DimensionModalitiesSelect
								dimension={dimB}
								modality={modB}
								handleChange={this.handleChangeModB}
								offset={dimA ? 2 : 7}
							/>
						)}
					</div>
					{modA &&
						modB && (
							<WrappedComponent
								modA={modA}
								modB={modB}
								labelModA={labelModA}
								labelModB={labelModB}
							/>
						)}
				</React.Fragment>
			);
		}
	}
	return Main;
};

export default hocDimensionSelector;
