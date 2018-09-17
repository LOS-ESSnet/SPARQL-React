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
import { buildExtremeCoords } from './build-extreme-coords';

const { TOP, RIGHT } = Hint.ALIGN;
const CHART_MARGINS = { left: 100, right: 100, top: 10, bottom: 100 };

const DATA_HINT_ALIGN = {
	horizontal: RIGHT,
	vertical: TOP,
};

export default class Bubble extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			extremeCoords: buildExtremeCoords(props.data),
		};
		this._rememberValue = this._rememberValue.bind(this);
	}

	_rememberValue(value) {
		this.setState({ value });
	}

	render() {
		const {
			value,
			extremeCoords: { xMin, xMax, yMin, yMax },
		} = this.state;
		const { data, label, xName, yName, sizeName } = this.props;
		return (
			<XYPlot
				width={1200}
				height={400}
				margin={CHART_MARGINS}
				xDomain={[xMin, xMax]}
				yDomain={[yMin, yMax]}
			>
				<VerticalGridLines />
				<HorizontalGridLines />
				<XAxis tickFormat={d => d} tickLabelAngle={-90} title={xName} />
				<YAxis title={yName} />
				<MarkSeries onNearestX={this._rememberValue} data={data} />
				{value ? (
					<Hint value={value} align={DATA_HINT_ALIGN}>
						<div className="rv-hint__content">
							{`${label ? `${label} :` : ''} ${value.label}`}
							<br />
							{`${xName ? `${xName} :` : ''} ${value.x}`}
							<br />
							{`${yName ? `${yName} :` : ''} ${value.y}`}
							<br />
							{`${sizeName ? `${sizeName} :` : ''} ${value.size}`}
						</div>
					</Hint>
				) : null}
			</XYPlot>
		);
	}
}
