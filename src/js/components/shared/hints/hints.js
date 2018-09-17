import React from 'react';

import {
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	MarkSeries,
	Hint,
} from 'react-vis';

const { TOP, RIGHT } = Hint.ALIGN;
const CHART_MARGINS = { left: 100, right: 100, top: 10, bottom: 100 };

const DATA_HINT_ALIGN = {
	horizontal: RIGHT,
	vertical: TOP,
};

export default class Hints extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
		this._rememberValue = this._rememberValue.bind(this);
	}

	_rememberValue(value) {
		this.setState({ value });
	}

	render() {
		const { value } = this.state;
		const { data, xName, yName } = this.props;
		return (
			<XYPlot width={1200} height={400} margin={CHART_MARGINS}>
				<VerticalGridLines />
				<HorizontalGridLines />
				<XAxis
					tickFormat={d => new Date(d).toLocaleDateString()}
					tickLabelAngle={-90}
					tickValues={data.map(d => d.x)}
				/>
				<YAxis />
				<MarkSeries onNearestX={this._rememberValue} data={data} />
				{value ? (
					<Hint value={value} align={DATA_HINT_ALIGN}>
						<div className="rv-hint__content">
							{`${xName ? `${xName} :` : ''} ${new Date(
								value.x
							).toLocaleDateString()}`}
							<br />
							{`${yName ? `${yName} :` : ''} ${value.y}`}
						</div>
					</Hint>
				) : null}
			</XYPlot>
		);
	}
}
