import React, { Component } from 'react';
import { Slider } from 'material-ui';
import Search from './search';
import EstablishmentSelect from './select-establishment';
import Divider from 'js/components/shared/divider';
import Container from './pop-container';
import D from 'js/i18n';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			establishment: '',
			nafItem: '',
			departement: '',
			town: '',
			distance: 1,
			zoom: 12,
			search: '',
			updateEstablishmentList: false,
		};
		this.handleChange = (object, key) =>
			this.setState({
				[key]: object,
				establishment: '',
				updateEstablishmentList: false,
			});
		this.clickSearch = e => {
			e.preventDefault();
			this.setState({ updateEstablishmentList: true });
		};
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
		const {
			establishment,
			distance,
			zoom,
			nafItem,
			departement,
			town,
			search,
			updateEstablishmentList,
		} = this.state;
		return (
			<React.Fragment>
				<Search
					nafItem={nafItem}
					departement={departement}
					town={town}
					search={search}
					handleChange={this.handleChange}
					clickSearch={this.clickSearch}
				/>
				{updateEstablishmentList && (
					<React.Fragment>
						<EstablishmentSelect
							establishment={establishment}
							handleChange={this.handleChangeEstablishment}
							nafItem={nafItem}
							geoloc={town || departement}
							search={search}
						/>
						{Object.keys(establishment).length !== 0 && (
							<React.Fragment>
								<Divider />
								<h2 className="centered">{D.slideDistance}</h2>
								<Slider
									value={distance}
									min={1}
									max={20}
									onChange={(event, val) => this.handleChangeDistance(val)}
								/>
								<Container
									siretEntreprise={establishment.value}
									distance={distance}
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
