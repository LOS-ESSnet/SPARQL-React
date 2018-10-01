import { sparqlConnect } from 'sparql-connect';
import config from 'config';

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
      PREFIX geo: <http://www.opengis.net/ont/geosparql#>

      SELECT DISTINCT ?polygon ?population WHERE {
				{
					SELECT ?latitude ?longitude WHERE {
						SERVICE <${config.SIRENE_ENDPOINT}> {
	              ?value a org:OrganizationalUnit ;
	                 geo-pos:long ?longitude ;
	                 geo-pos:lat ?latitude .
	                 ${nafFilter(nafItem)}
	                 ${estabSizeFilter(establishmentSize)}
									 ${depFilter(department)}
	                 FILTER(STR(?longitude) != '')
	          }
					}
				}
        SERVICE <${config.CENSUS_POINT_ENDPOINT}> {
          ?c omgeo:nearby(?latitude ?longitude "${distance}km") ;
          	 gn:population ?population ;
             geo:hasGeometry ?geo .
          ?geo geo:asWKT ?polygon
        }
      }
      ORDER BY DESC(?population)
`;

export default sparqlConnect(queryBuilder, {
	queryName: 'polygons',
	params: ['nafItem', 'establishmentSize', 'department', 'distance'],
});
