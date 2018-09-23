import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Map from './map';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = (siretEntreprise, distance) => `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX omgeo: <http://www.ontotext.com/owlim/geo#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?polygon ?population ?lon ?lat where {
    SERVICE <${config.SIRENE_ENDPOINT}> {
     <http://id.insee.fr/sirene/siret/${siretEntreprise}> geo-pos:long ?lon ;
                                                          geo-pos:lat ?lat .
    }
    SERVICE <${config.CENSUS_POINT_ENDPOINT}> {
      ?c omgeo:nearby(?lat ?lon "${distance}km") .
    	?c gn:population ?population .
        ?c geo:hasGeometry ?geo .
        ?geo geo:asWKT ?polygon
    }
}
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'closeTiles',
	params: ['siretEntreprise', 'distance'],
});

const PopContainer = ({
	closeTiles,
	longitude,
	latitude,
	zoom,
	distance,
	labelEntreprise,
}) => {
	const reducer = (acc, curVal) => acc + Number.parseFloat(curVal.population);
	const sommePop = closeTiles.reduce(reducer, 0);
	return (
		<React.Fragment>
			<h2 className="centered">
				{D.inhabitantEstablishment(sommePop, distance, labelEntreprise)}
			</h2>
			<Map
				data={closeTiles}
				longitude={closeTiles[0].lon}
				latitude={closeTiles[0].lat}
				zoom={zoom}
			/>
		</React.Fragment>
	);
};

export default connector(PopContainer, {
	loading: () => <Spinner text={D.loading} />,
});
