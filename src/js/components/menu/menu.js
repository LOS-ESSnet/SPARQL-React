import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MenuItems from './menu-items';

class AppMenu extends Component {
	constructor() {
		super();
		this.state = { open: false };

		this.handleToggle = () => this.setState({ open: !this.state.open });
		this.handleMenuItem = route => {
			this.setState({ open: false });
		};
	}

	render() {
		const { items } = this.props;
		const menuItems = items.map(
			({ route, title, type }) =>
				type === 'SubHeader' ? (
					<div key={title}>
						<Divider />
						<Subheader style={{ color: '#ee3467', fontSize: '26px' }}>
							{title}
						</Subheader>
					</div>
				) : (
					<MenuItems
						key={route}
						route={route}
						title={title}
						close={this.handleMenuItem}
					/>
				)
		);

		return (
			<div>
				<AppBar
					title={<span style={{ color: '#FFFFFF' }}>SPARQL React</span>}
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					onLeftIconButtonClick={this.handleToggle}
					style={{ backgroundColor: '#ee3467' }}
				/>
				<Drawer
					ref="leftNav"
					docked={false}
					open={this.state.open}
					onRequestChange={this.handleToggle}
					style={{
						width: 1000,
					}}
					width="25%"
				>
					{menuItems}
				</Drawer>
			</div>
		);
	}
}

export default AppMenu;
