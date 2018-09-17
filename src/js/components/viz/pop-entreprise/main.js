import React, { Component } from 'react';
import Container from './pop-container';
import EntSelect from './sirene-select';
import { Slider } from 'material-ui';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			entreprise: { id: '' },
			distance: 1,
			zoom: 12,
		};
		this.handleChangeEntreprise = entreprise => this.setState({ entreprise });
		this.handleChangeDistance = distance => {
			this.setState({
				distance: Number.parseInt(distance, 10),
				zoom: (55 - distance) / 4.5,
			});
		};
	}
	render() {
		const { entreprise, distance, zoom } = this.state;
		return (
			<React.Fragment>
				<EntSelect
					entSelect={entreprise.id}
					handleChange={this.handleChangeEntreprise}
				/>
				{Object.keys(entreprise.id).length !== 0 && (
					<React.Fragment>
						<h2>Vary the diameter around the company!</h2>
						<Slider
							value={distance}
							min={1}
							max={20}
							onChange={(event, val) => this.handleChangeDistance(val)}
						/>
						<Container
							siretEntreprise={entreprise.id}
							distance={distance}
							longitude={entreprise.lon}
							latitude={entreprise.lat}
							zoom={zoom}
							labelEntreprise={entreprise.label}
						/>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}
