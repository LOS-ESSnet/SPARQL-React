import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Select from 'js/components/shared/select';
import config from 'config';

const queryBuilder = () => `
          PREFIX skos:<http://www.w3.org/2004/02/skos/core#>

          SELECT  ?id ?label   WHERE {
            SERVICE <${config.INSEE_ENDPOINT}> {
          	?id skos:inScheme <http://id.insee.fr/codes/nafr2/naf> .
          	?id skos:notation ?code .
          	?id skos:prefLabel ?lab .
          	 FILTER(lang(?lab) = 'en') .
             FILTER regex(?code, "[0-9]{2}.[0-9]{2}[A-Z]") .
             BIND(concat(?code," - ",?lab) as ?label)
          }
        }
        order by ?id
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'nafList',
});

const NafSelect = ({ nafList, nafSelect, handleChange }) => {
	return (
		<div>
			<Select
				label="Select an activity ..."
				options={nafList}
				value={nafSelect}
				onChange={e => handleChange(nafList.find(naf => naf.id === e))}
			/>
		</div>
	);
};

export default connector(NafSelect, {
	loading: () => <Spinner text={'Loading'} />,
});
