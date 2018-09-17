import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Select from 'js/components/shared/select';
import config from 'config';

const queryBuilder = () => `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos>
      PREFIX gn: <http://www.geonames.org/ontology#>
      PREFIX omgeo: <http://www.ontotext.com/owlim/geo#>

      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      select DISTINCT ?id ?label ?lon ?lat where {
        SERVICE <${config.SIRENE_ENDPOINT}> {
              select * where {
                  # On récupère la liste des entreprises
                  ?e rdfs:label ?label ;
                     a geo-pos:SpatialThing ;
                     geo-pos:long ?lon ;
                     geo-pos:lat ?lat .
                  BIND(STRAFTER(STR(?e),'/sirene/siret/') AS ?id) .}
              LIMIT 100
        }
      }
      ORDER BY ?label
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'entrepriseList',
});

const EntSelect = ({ entrepriseList, entSelect, handleChange }) => {
	return (
		<div>
			<Select
				label="Select an establishment ..."
				options={entrepriseList}
				value={entSelect}
				onChange={e => handleChange(entrepriseList.find(entr => entr.id === e))}
			/>
		</div>
	);
};

export default connector(EntSelect, {
	loading: () => <Spinner text={'Loading'} />,
});
