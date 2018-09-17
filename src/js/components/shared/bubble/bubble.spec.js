import React from 'react';
import { shallow } from 'enzyme';
import Bubbles from './';

const xyData = Array(100)
	.fill('')
	.map((a, i) => ({
		x: (Math.random() * 10).toPrecision(2),
		y: (Math.random() * 10).toPrecision(2),
		size: (Math.random() * 10).toPrecision(2),
		label: `Area ${i + 1}`,
	}));

const component = <Bubbles data={xyData} />;

describe('bubbles', () => {
	it('renders without crashing', () => {
		shallow(component);
	});

	it('returns value from component state', () => {
		const wrapper = shallow(component);
		expect(wrapper.state('value')).toBeNull();
	});

	it('should not return value', () => {
		const wrapper = shallow(component);
		expect(wrapper.find('.rv-hint__content').length).toEqual(0);
	});
	it("returned value should contains 'Area'", () => {
		const wrapper = shallow(component);
		wrapper.setState({ value: { x: 1, y: 1, size: 1, label: 'Area' } });
		expect(
			wrapper
				.find('.rv-hint__content')
				.first()
				.text()
		).toContain('Area');
	});
});
