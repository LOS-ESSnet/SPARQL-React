import React from 'react';
import { Chart } from 'primereact/chart';
import Select from 'js/components/shared/select';
import { mapMyQuery } from './data-utils';
import './permits.css';

class MyPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { year: '2014' };
		this.handleChange = year => this.setState({ year });
	}

	render() {
		const { year } = this.state;
		const { permitsByDep } = this.props;
		return (
			<React.Fragment>
				<div className="centered">
					<i>
						Legal populations from id.insee.fr and building permits calculated
						into data cube.
					</i>
				</div>
				<div className="contenu">
					<Select
						col={4}
						offset={4}
						label="Change year ..."
						options={[
							{ id: '2014', label: '2014' },
							{ id: '2015', label: '2015' },
						]}
						onChange={this.handleChange}
						value={this.state.year}
					/>
					<div>
						<Chart type="line" data={mapMyQuery(year)(permitsByDep)} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default MyPage;
