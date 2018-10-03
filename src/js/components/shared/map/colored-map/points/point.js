import React, { Component } from 'react';
import Tooltip from './tooltip';
import svg from 'img/pointer.png';

class Point extends Component {
	constructor(props) {
		super(props);
		this.state = { tooltip: false };
		this.onMouseEnterHandler = () => this.setState({ tooltip: true });
		this.onMouseLeaveHandler = () => this.setState({ tooltip: false });
	}
	render() {
		const { tooltip } = this.state;
		const { longitude, latitude, data, pointContentArray } = this.props;
		return (
			<React.Fragment>
				<div
					onMouseEnter={this.onMouseEnterHandler}
					onMouseLeave={this.onMouseLeaveHandler}
				>
					<img src={svg} alt="svg" className="svg-pointer" />
				</div>
				{tooltip &&
					pointContentArray &&
					pointContentArray.length > 0 && (
						<Tooltip
							longitude={longitude}
							latitude={latitude}
							data={data}
							pointContentArray={pointContentArray}
						/>
					)}
			</React.Fragment>
		);
	}
}

export default Point;
