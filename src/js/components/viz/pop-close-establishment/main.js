import React, { Component } from 'react';
import { Slider } from 'material-ui';
import Search from './search';
import EstablishmentSelect from './select-establishment';
import Divider from 'js/components/shared/divider';
import Container from './pop-container';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			establishment: { id: '' },
			nafItem: { id: '' },
			distance: 1,
			zoom: 12,
			search: '',
		};
		this.handleChange = (object, key) =>
			this.setState({ [key]: object, establishment: { id: '' } });
		this.handleChangeEstablishment = establishment =>
			this.setState({ establishment });
		this.handleChangeDistance = distance => {
			this.setState({
				distance: Number.parseInt(distance, 10),
				zoom: (55 - distance) / 4.5,
			});
		};
	}
	render() {
		const { establishment, distance, zoom, nafItem, search } = this.state;
		return (
			<React.Fragment>
				<Search
					nafItem={nafItem}
					search={search}
					handleChange={this.handleChange}
				/>
				{nafItem.id &&
					search.length >= 3 && (
						<React.Fragment>
							<EstablishmentSelect
								entSelect={establishment.id}
								handleChange={this.handleChangeEstablishment}
								idNaf={nafItem.id}
								search={search}
							/>
							{establishment.id && <Divider />}
							{Object.keys(establishment.id).length !== 0 && (
								<React.Fragment>
									<h2>Vary the diameter around the company!</h2>
									<Slider
										value={distance}
										min={1}
										max={20}
										onChange={(event, val) => this.handleChangeDistance(val)}
									/>
									<Container
										siretEntreprise={establishment.id}
										distance={distance}
										longitude={establishment.lon}
										latitude={establishment.lat}
										zoom={zoom}
										labelEntreprise={establishment.label}
									/>
								</React.Fragment>
							)}
						</React.Fragment>
					)}
			</React.Fragment>
		);
	}
}
