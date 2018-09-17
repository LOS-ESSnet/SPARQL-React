import React from 'react';
import { storiesOf } from '@storybook/react';
import globalDecorator from 'global-decorator';
import Menu from './';
import 'react-vis/dist/style.css';
import { MemoryRouter } from 'react-router';

const stories = storiesOf('Menu', module);
const storeDecorator = story => (
	<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
);
stories.addDecorator(globalDecorator).addDecorator(storeDecorator);

const items = [
	{ route: '/', title: 'Home', body: <div>Home</div> },
	{ route: '', title: 'SubHeader', type: 'SubHeader' },
	{ route: '/page1', title: 'Page 1', body: <div>Page 1</div> },
	{ route: '/page2', title: 'Page 2', body: <div>Page 2</div> },
	{ route: '', title: 'SubHeader 2', type: 'SubHeader' },
	{ route: '/page3', title: 'Page 3', body: <div>Page 3</div> },
	{ route: '/page4', title: 'Page 4', body: <div>Page 4</div> },
];

stories.add('Default', () => <Menu items={items} />);
