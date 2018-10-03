import React from 'react';
import { sparqlConnect, sparqlCombine } from 'sparql-connect';
import Map from './map';
import Spinner from 'js/components/shared/spinner';
import polygonConnector from 'js/components/connectors/polygons';
import config from 'config';
import D from 'js/i18n';

const nafFilter = nafItem =>
	nafItem ? `?value org:purpose <${nafItem}> .` : '';
const estabSizeFilter = etabSize =>
	etabSize ? `?value dim-etab:effectif <${etabSize}> .` : '';
const depFilter = department =>
	department ? `?value gn:locatedIn <${department}> .` : '';

const queryBuilder = (nafItem, establishmentSize, department, distance) => `
      PREFIX org: <http://www.w3.org/ns/org#>
      PREFIX dim-etab: <http://id.insee.fr/sirene/etablissement/>
      PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      PREFIX gn: <http://www.geonames.org/ontology#>
      PREFIX omgeo: <http://www.ontotext.com/owlim/geo#>
			PREFIX mes: <http://id.insee.fr/sirene/etablissement/>
			PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

      SELECT DISTINCT ?latitude ?longitude ?label ?workForce WHERE {
				SERVICE <${config.SIRENE_ENDPOINT}> {
            ?value a org:OrganizationalUnit ;
							 rdfs:label ?label ;
               geo-pos:long ?longitude ;
               geo-pos:lat ?latitude .
		#					 mes:effectif ?effURI .
		#				?effURI skos:prefLabel ?workForce .
            ${nafFilter(nafItem)}
            ${estabSizeFilter(establishmentSize)}
					  ${depFilter(department)}
            FILTER(STR(?longitude) != '')
				}
      }
`;

const pointConnector = sparqlConnect(queryBuilder, {
	queryName: 'mapFr',
	params: ['nafItem', 'establishmentSize', 'department', 'distance'],
});

const connector = sparqlCombine(pointConnector, polygonConnector);

const MapContainer = ({ mapFr, polygons }) => (
	<Map pointCoords={mapFr} polygons={polygons} />
);

export default connector(MapContainer, {
	loading: () => <Spinner text={D.loading} />,
});
