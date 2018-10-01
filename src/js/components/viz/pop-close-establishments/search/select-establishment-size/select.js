import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import ReactSelect from 'js/components/shared/react-select';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = () => `
      PREFIX skos:<http://www.w3.org/2004/02/skos/core#>

      SELECT ?value ?label WHERE {
        SERVICE <${config.SIRENE_ENDPOINT}> {
          ?value skos:inScheme <http://id.insee.fr/codes/tranche-effectif> ;
                skos:prefLabel ?label
        }
      }
			ORDER BY ?value
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'establishmentSizeList',
});

const EstabSizeSelect = ({
	establishmentSizeList,
	establishmentSize,
	handleChange,
}) => (
	<React.Fragment>
		<h2 className="centered">{`${D.establishmentSize}`}</h2>
		<ReactSelect
			placeholder={D.selectSize}
			options={establishmentSizeList}
			value={
				establishmentSize
					? establishmentSizeList.find(n => n.value === establishmentSize)
					: ''
			}
			onChange={handleChange}
			searchable={true}
			unclearable={false}
		/>
	</React.Fragment>
);

export default connector(EstabSizeSelect, {
	loading: () => <Spinner text={D.loading} />,
});
