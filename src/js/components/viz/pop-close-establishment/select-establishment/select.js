import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Select from 'js/components/shared/select';
import config from 'config';

const queryBuilder = (idNaf, search) => `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos>
      PREFIX gn: <http://www.geonames.org/ontology#>
      PREFIX org: <http://www.w3.org/ns/org#>

      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      select DISTINCT ?id ?label ?lon ?lat where {
        SERVICE <${config.SIRENE_ENDPOINT}> {
              select * where {
                  ?e a org:OrganizationalUnit ;
                     rdfs:label ?label ;
                     geo-pos:long ?lon ;
                     geo-pos:lat ?lat ;
                     gn:locatedIn ?departement ;
                     gn:locatedIn ?commune .
                  FILTER(REGEX(?departement, '/departement/'))
                  FILTER(REGEX(?commune, '/commune/'))
                  ${idNaf ? `?e org:purpose <${idNaf}> .` : ''}
                  BIND(STRAFTER(STR(?e),'/sirene/siret/') AS ?id) .}

        }
        ${search ? `FILTER(regex(?label,'${search}','i')) .` : ''}
      }
      ORDER BY ?label
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'entrepriseList',
	params: ['idNaf', 'search'],
});

const EntSelect = ({ entrepriseList, entSelect, handleChange }) => (
	<div className="mui-row">
		<div className="mui-col-md-6 mui-col-md-offset-3">
			<Select
				label={`Find ${entrepriseList.length} establishment${
					entrepriseList.length > 1 ? 's' : ''
				}`}
				options={entrepriseList}
				value={entSelect}
				onChange={e => handleChange(entrepriseList.find(entr => entr.id === e))}
			/>
		</div>
	</div>
);

export default connector(EntSelect, {
	loading: () => <Spinner text={'Loading'} />,
});
