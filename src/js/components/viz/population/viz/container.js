import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Viz from './viz';
import Spinner from 'js/components/shared/spinner';
import D from 'js/i18n';

const queryBuilder = area => `
  PREFIX idemo:<http://rdf.insee.fr/def/demo#>
  PREFIX igeo:<http://rdf.insee.fr/def/geo#>
  PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>
  SELECT ?date ?population ?label
  WHERE {
    <${area}> igeo:nom ?label ; idemo:population ?popURI .
    ?popURI idemo:populationTotale ?population ; idemo:date ?date .
  }
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'areaPopulation',
	params: ['area'],
});

const VizContainer = ({ areaPopulation }) => (
	<div>
		<Viz data={areaPopulation} />
	</div>
);

export default connector(VizContainer, {
	loading: () => <Spinner text={D.loading} />,
});
