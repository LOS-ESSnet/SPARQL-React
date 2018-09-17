import React from 'react';
import { storiesOf } from '@storybook/react';
import globalDecorator from 'global-decorator';
import Spinner from './';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import './spinner.css';

const stories = storiesOf('Spinner', module);
stories.addDecorator(globalDecorator).addDecorator(withKnobs);

stories.add('Default', () => <Spinner text={text('Text', 'My text')} />);
