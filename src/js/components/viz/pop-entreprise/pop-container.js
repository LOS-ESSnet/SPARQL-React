import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Map from './map';
import config from 'config';

const queryBuilder = (siretEntreprise, distance) => `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX omgeo: <http://www.ontotext.com/owlim/geo#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
select ?polygon ?population where {
    SERVICE <${config.SIRENE_ENDPOINT}> {
      # Select establishment location
     <https://api.insee.fr/entreprises/sirene/siret/${siretEntreprise}> geo-pos:long ?lon ;
       geo-pos:lat ?lat .
    }
    # Select population around 'distance'
    SERVICE <${config.CENSUS_POINT_ENDPOINT}>
    {
      ?c omgeo:nearby(?lat ?lon "${distance}km") .
    	?c gn:population ?population .
        ?c geo:hasGeometry ?geo .
        ?geo geo:asWKT ?polygon
    }
}
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'carreauxProches',
	params: ['siretEntreprise', 'distance'],
});

const PopContainer = ({
	carreauxProches,
	longitude,
	latitude,
	zoom,
	distance,
	labelEntreprise,
}) => {
	const reducer = (acc, curVal) => acc + Number.parseFloat(curVal.population);
	const sommePop = carreauxProches.reduce(reducer, 0);
	return (
		<React.Fragment>
			<h2 className="centered">
				There are {sommePop} inhabitants à {distance} km around "{' '}
				{labelEntreprise} "
			</h2>
			<Map
				data={carreauxProches}
				longitude={longitude}
				latitude={latitude}
				zoom={zoom}
			/>
		</React.Fragment>
	);
};

export default connector(PopContainer, {
	loading: () => <Spinner text={'Loading'} />,
});
