import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import ReactSelect from 'js/components/shared/react-select';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = departement => `
          PREFIX igeo:<http://rdf.insee.fr/def/geo#>
		  PREFIX owl:<http://www.w3.org/2002/07/owl#>
					
          SELECT ?value ?label WHERE {
			SERVICE <${config.INSEE_ENDPOINT}> {
				?dep owl:sameAs <${departement}> . 
				?com igeo:subdivisionDirecteDe* ?dep .
				?com a igeo:Commune .
				?com igeo:codeINSEE ?codeTown .
				?com igeo:nom ?labelTown .
				?com owl:sameAs ?town .
				OPTIONAL {?com igeo:subdivision ?arr .
						?arr igeo:nom ?labelArr .
						?arr igeo:codeINSEE ?codeArr .
				FILTER(REGEX(STR(?arr),'/arrondissementMunicipal/'))} .
				
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
