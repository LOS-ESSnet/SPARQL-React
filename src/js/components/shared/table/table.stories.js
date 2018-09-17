import React from 'react';
import { storiesOf } from '@storybook/react';
import globalDecorator from 'global-decorator';
import Table from './';
import { withKnobs, text } from '@storybook/addon-knobs/react';

const stories = storiesOf('Table', module);
stories.addDecorator(globalDecorator).addDecorator(withKnobs);

const data = Array(99)
	.fill('')
	.map((a, i) => ({
		firstcol: `1 - ${i + 1}`,
		secondcol: `2 - ${i + 1}`,
	}));

stories.add('Default', () => (
	<Table title={text('Title', 'My table')} data={data} />
));
