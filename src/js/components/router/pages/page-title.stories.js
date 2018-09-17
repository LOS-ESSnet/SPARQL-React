import React from 'react';
import { storiesOf } from '@storybook/react';
import globalDecorator from 'global-decorator';
import Title from './page-title';
import { withKnobs, text } from '@storybook/addon-knobs/react';

const stories = storiesOf('Title', module);
stories.addDecorator(globalDecorator).addDecorator(withKnobs);

stories.add('Default', () => <Title title="Title" subtitle="Subtitle" />);

stories.add('With all props', () => (
	<Title
		title={text('Title', 'My title')}
		subtitle={text('Subtitle', 'My subtitle')}
	/>
));
