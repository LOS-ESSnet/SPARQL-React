import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import ReactSelect from 'js/components/shared/react-select';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = departement => `
          PREFIX igeo:<http://rdf.insee.fr/def/geo#>
          SELECT ?value ?label WHERE {
            SERVICE <${config.INSEE_ENDPOINT}> {
          	?town a igeo:Commune .
            ?town igeo:subdivisionDe <${departement}> .
          	?town igeo:codeINSEE ?codeTown .
          	?town igeo:nom ?labelTown .
            OPTIONAL {?town igeo:subdivision ?arr .
                      ?arr igeo:nom ?labelArr .
                      ?arr igeo:codeINSEE ?codeArr .
              FILTER(REGEX(STR(?arr),'/arrondissementMunicipal/'))} .
          	FILTER(lang(?lab) = 'fr') .
            BIND(IF(BOUND (?arr), ?arr, ?town ) as ?value)
            BIND(IF(BOUND (?codeArr), ?codeArr, ?codeTown ) as ?code)
            BIND(IF(BOUND (?labelArr), ?labelArr, ?labelTown ) as ?lab)
            BIND(concat(STR(?code)," - ",STR(?lab)) as ?label)
          }
        }
        order by ?code
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'townList',
	params: ['departement'],
});

const TownSelect = ({ townList, town, handleChange }) => {
	return (
		<div>
			<h2 className="centered">{D.municipalityTitle}</h2>
			<ReactSelect
				placeholder={D.selectMunicipality}
				options={townList}
				value={town ? townList.find(d => d.value === town) : ''}
				onChange={handleChange}
				searchable={true}
				unclearable={false}
			/>
		</div>
	);
};

export default connector(TownSelect, {
	loading: () => <Spinner text={D.loading} />,
});
