import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import ReactSelect from 'js/components/shared/react-select';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = () => `
          PREFIX skos:<http://www.w3.org/2004/02/skos/core#>

          SELECT  ?value ?label   WHERE {
            SERVICE <${config.INSEE_ENDPOINT}> {
          	?value skos:inScheme <http://id.insee.fr/codes/nafr2/naf> .
          	?value skos:notation ?code .
          	?value skos:prefLabel ?lab .
          	 FILTER(lang(?lab) = 'fr') .
             FILTER regex(?code, "[0-9]{2}.[0-9]{2}[A-Z]") .
             BIND(concat(?code," - ",?lab) as ?label)
          }
        }
        order by ?id
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'nafList',
});

const NafSelect = ({ nafList, nafItem, handleChange }) => (
	<div>
		<h2 className="centered">{D.activityTitle}</h2>
		<ReactSelect
			placeholder={D.selectActivity}
			options={nafList}
			value={nafItem ? nafList.find(n => n.value === nafItem) : ''}
			onChange={handleChange}
			searchable={true}
		/>
	</div>
);

export default connector(NafSelect, {
	loading: () => <Spinner text={D.loading} />,
});
