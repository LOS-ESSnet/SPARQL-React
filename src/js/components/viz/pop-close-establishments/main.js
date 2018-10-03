import React, { Component } from 'react';
import Search from './search';
import Results from './results';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
			establishmentSize: '',
			nafItem: '',
			department: '',
			distance: '',
			updateEstablishmentList: false,
		};
		this.handleChange = (object, key) =>
			this.setState({
				[key]: object,
				updateEstablishmentList: false,
			});
		this.clickSearch = e => {
			e.preventDefault();
			this.setState({ updateEstablishmentList: true });
		};
	}
	render() {
		const {
			establishmentSize,
			nafItem,
			department,
			distance,
			updateEstablishmentList,
		} = this.state;
		return (
			<React.Fragment>
				<Search
					nafItem={nafItem}
					establishmentSize={establishmentSize}
					department={department}
					distance={distance}
					handleChange={this.handleChange}
					clickSearch={this.clickSearch}
				/>
				{updateEstablishmentList && (
					<Results
						nafItem={nafItem}
						establishmentSize={establishmentSize}
						department={department}
						distance={distance}
					/>
				)}
			</React.Fragment>
		);
	}
}
