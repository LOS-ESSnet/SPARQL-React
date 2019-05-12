import React, { Component } from 'react';
import DataTables from 'material-ui-datatables';
import D from 'js/i18n';

class Table extends Component {
	constructor(props) {
		super();
		this.state = { filter: '', page: 1, rowSize: 5 };
	}
	handleFilterValueChange = filter => this.setState({ filter, page: 1 });

	handleSortOrderChange = (key, order) =>
		this.setState({ order: { key, order } });

	onRowSizeChange = (index, rowSize) => {
		this.setState({ rowSize });
	};

	onNextPageClick = () => this.setState({ page: this.state.page + 1 });

	onPreviousPageClick = () => this.setState({ page: this.state.page - 1 });

	render() {
		const { data, title } = this.props;
		const { filter, order, page, rowSize } = this.state;

		const columns = Object.keys(data[0]).map(e => {
			return {
				key: e.toLowerCase(),
				label: e.toUpperCase(),
				sortable: true,
			};
		});
		const filteredData = data.filter(d =>
			Object.values(d)
				.join('')
				.toLowerCase()
				.replace(/\s/g, '')
				.includes(filter.toLowerCase().replace(/\s/g, ''))
		);
		if (order)
			filteredData.sort((a, b) =>
				order.order === 'asc'
					? a[order.key] - b[order.key]
					: b[order.key] - a[order.key]
			);
		const pageData = filteredData.slice((page - 1) * rowSize, page * rowSize);
		return (
			<DataTables
				title={title}
				titleStyle={{ color: 'white' }}
				filterHintText={D.search}
				filterValue={filter}
				height={'auto'}
				selectable={false}
				showRowHover={true}
				stripedRows={true}
				tableHeaderColumnStyle={{ textAlign: 'center' }}
				columns={columns}
				data={pageData}
				showHeaderToolbar={true}
				showCheckboxes={false}
				onFilterValueChange={this.handleFilterValueChange}
				onSortOrderChange={this.handleSortOrderChange}
				rowSizeLabel={'Lignes par page'}
				rowSizeList={[5, 10, 20]}
				rowSize={rowSize}
				onRowSizeChange={this.onRowSizeChange}
				page={page}
				onPreviousPageClick={this.onPreviousPageClick}
				onNextPageClick={this.onNextPageClick}
				count={filteredData.length}
			/>
		);
	}
}

export default Table;
