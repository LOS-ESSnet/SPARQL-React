import React from 'react';
import { storiesOf } from '@storybook/react';
import globalDecorator from 'global-decorator';
import Hints from './';
import 'react-vis/dist/style.css';
import { withKnobs, text } from '@storybook/addon-knobs/react';

const stories = storiesOf('Hints', module);
stories.addDecorator(globalDecorator).addDecorator(withKnobs);

const xyData = [
	{ x: new Date('2010-01-01').getTime(), y: '10' },
	{ x: new Date('2011-01-01').getTime(), y: '13' },
	{ x: new Date('2012-01-01').getTime(), y: '30' },
];

stories.add('Default', () => (
	<Hints data={xyData} xName="Date" yName="Population" />
));
