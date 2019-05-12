import React from 'react';
import { fromJS } from 'immutable';
import D from 'js/i18n';
import { prettyNumber } from 'js/utils/pretty-number';
import { defaultMapStyle, dataLayer } from './style';

export const buildClasses = (data, colors) => {
	const values = data.map(d => d.myIndicator).sort((a, b) => a - b);
	const step = Math.trunc(values.length / colors.length) + 1;
	return values.reduce((_, v, i) => {
		if (i % step === 0 && i !== 0) _.push([v, colors.splice(0, 1)[0]]);
		return _;
	}, []);
};

const getClass = (classes, value) => {
	let cl = classes.length - 1;
	for (let i = 0; i < classes.length - 1; i += 1) {
		const c = Number.parseFloat(classes[i][0]);
		if (value < c) {
			cl = i;
			break;
		}
	}
	return cl;
};

export const buildGeoData = data => ({
	type: 'FeatureCollection',
	features: data.map(({ contours, ...other }) => ({
		geometry: contours,
		properties: {
			...other,
		},
	})),
});

const createClasses = (featureCollection, accessor, classes) => {
	const { features } = featureCollection;
	features.forEach(f => {
		const value = accessor(f);
		f.properties.value = value;
		f.properties.myClass = getClass(classes, value);
	});
};

export const buildData = (data, classes) => {
	const geoData = buildGeoData(data);
	createClasses(geoData, f => f.properties.myIndicator, classes);
	return defaultMapStyle
		.setIn(['sources', 'mySource'], fromJS({ type: 'geojson', data: geoData }))
		.set('layers', defaultMapStyle.get('layers').push(dataLayer(classes)));
};

export const buildLegend = classes =>
	classes.map((c, i) => {
		const square = color => (
			<span style={{ backgroundColor: color, color }}>color</span>
		);
		let content;
		if (i === 0) content = ` < ${prettyNumber(c[0])}`;
		else if (i === classes.length - 1)
			content = ` > ${prettyNumber(classes[i - 1][0])}`;
		else
			content = ` ${D.between} ${prettyNumber(
				classes[i - 1][0]
			)} et ${prettyNumber(c[0])}`;
		return (
			<p key={`legend-item-${i}`}>
				{square(c[1])}
				{content}
			</p>
		);
	});
