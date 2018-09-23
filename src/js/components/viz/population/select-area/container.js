import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Select from 'js/components/shared/select';
import D from 'js/i18n';

const queryBuilder = type => `
  PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX igeo:<http://rdf.insee.fr/def/geo#>
  SELECT ?id ?label
  WHERE {
    ?id rdf:type <${type}> .
    ?id igeo:nom ?label
  }
  ORDER BY ?label
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'areaList',
	params: ['type'],
});

const AreaSelector = ({ areaList, area, onChange }) => (
	<Select
		label={D.chooseArea}
		options={areaList}
		value={area}
		onChange={onChange}
	/>
);

export default connector(AreaSelector, {
	loading: () => <Spinner text={D.loading} />,
});
