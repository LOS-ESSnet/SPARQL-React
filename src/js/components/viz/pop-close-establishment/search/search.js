import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchPrevious from 'material-ui/svg-icons/action/search';
import NafSelect from './naf-select';
import DepSelect from './dep-select';
import Input from 'js/components/shared/input';
import TownSelect from './town-select';
import D from 'js/i18n';
import './search.css';

export default ({
	nafItem,
	departement,
	town,
	search,
	handleChange,
	clickSearch,
}) => {
	const geoloc = town || departement;
	return (
		<div className="search">
			<div className="mui-row">
				<div className="mui-col-md-6">
					<NafSelect
						nafSelect={nafItem}
						handleChange={e => handleChange(e, 'nafItem')}
					/>
				</div>
				<div className="mui-col-md-6">
					<DepSelect
						departement={departement}
						handleChange={e => handleChange(e, 'departement')}
					/>
				</div>
			</div>
			<div className="mui-row">
				<div className="mui-col-md-6">
					<Input
						id="my-search"
						label={D.searchEstablishment}
						value={search}
						onChange={e => handleChange(e, 'search')}
						titleCenter={true}
					/>
				</div>
				<div className="mui-col-md-6">
					{departement && (
						<TownSelect
							departement={departement}
							town={town}
							handleChange={e => handleChange(e, 'town')}
						/>
					)}
				</div>
			</div>
			<div className="mui-row centered">
				<FloatingActionButton
					disabled={!isToDisable(nafItem, geoloc)}
					onClick={clickSearch}
					secondary={true}
				>
					<SearchPrevious />
				</FloatingActionButton>
			</div>
			<Warning nafItem={nafItem} geoloc={geoloc} />
		</div>
	);
};

const Warning = ({ nafItem, geoloc }) =>
	isToDisable(nafItem, geoloc) ? null : (
		<h3 className="centered">
			<i>{D.searchCondition}</i>
		</h3>
	);

const isToDisable = (nafItem, geoloc) =>
	geoloc &&
	(geoloc.match(/\/commune\/|\/arrondissementMunicipal\//) ||
		(nafItem && geoloc));
