import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import Points from './points';
import Legend from './legend';
import Tooltip from './tooltip';
import { buildData, buildClasses } from './build-map';
import { TOKEN } from 'config';

export default class App extends Component {
	constructor(props) {
		super();
		const { data, colors, viewport, pointCoords, zoom } = props;
		const classes = buildClasses(data, colors);
		this.state = {
			classes,
			mapStyle: buildData(data, classes),
			hoveredFeature: null,
			viewport: Object.assign(
				{
					latitude:
						pointCoords && pointCoords.length === 1
							? Number.parseFloat(pointCoords[0].latitude)
							: 47,
					longitude:
						pointCoords && pointCoords.length === 1
							? Number.parseFloat(pointCoords[0].longitude)
							: 6.14,
					zoom: zoom ? Number.parseFloat(zoom, 10) : 4.5,
					bearing: 0,
					pitch: 0,
					width: 500,
					height: 500,
				},
				viewport
			),
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this._resize);
		this._resize();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._resize);
	}

	componentWillReceiveProps(nextProps) {
		const { data, colors, zoom } = nextProps;
		const newViewport = {
			...this.state.viewport,
			zoom: Number.parseInt(zoom, 10) || 4.5,
		};
		this.setState({
			mapStyle: buildData(data, buildClasses(data, colors)),
			viewport: newViewport,
		});
	}

	_resize = () => {
		this.setState({
			viewport: {
				...this.state.viewport,
				width: window.innerWidth,
				height: window.innerHeight * 0.7,
			},
		});
	};

	_onViewportChange = viewport => this.setState({ viewport });

	_onHover = e => {
		const {
			features,
			srcEvent: { offsetX, offsetY },
		} = e;
		const hoveredFeature =
			features && features.find(f => f.layer.id === 'data');
		this.setState({ hoveredFeature, x: offsetX, y: offsetY });
	};

	render() {
		const { viewport, mapStyle, hoveredFeature, x, y, classes } = this.state;
		const { legend, contentArray, pointCoords, pointContentArray } = this.props;
		return (
			<MapGL
				{...viewport}
				mapStyle={mapStyle}
				onViewportChange={this._onViewportChange}
				onHover={this._onHover}
				mapboxApiAccessToken={TOKEN}
			>
				{pointCoords &&
					pointCoords.length > 0 && (
						<Points
							pointCoords={pointCoords}
							pointContentArray={pointContentArray}
						/>
					)}
				{legend && <Legend legend={legend} classes={classes} />}
				{contentArray.length !== 0 &&
					hoveredFeature && (
						<Tooltip
							hoveredFeature={hoveredFeature}
							x={x}
							y={y}
							contentArray={contentArray}
						/>
					)}
			</MapGL>
		);
	}
}
