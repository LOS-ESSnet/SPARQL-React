import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import config from 'config';
import { prettyNumber } from 'js/utils/pretty-number';
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
			PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

      SELECT (sum(?population) as ?pop) WHERE {
        SELECT DISTINCT ?c ?population WHERE {
					{
						SELECT ?lat ?lon WHERE {
							SERVICE <${config.SIRENE_ENDPOINT}> {
		              ?value a org:OrganizationalUnit ;
		                 geo-pos:long ?lon ;
		                 geo-pos:lat ?lat .
		                 ${nafFilter(nafItem)}
		                 ${estabSizeFilter(establishmentSize)}
										 ${depFilter(department)}
		                 FILTER(STR(?lon) != '')
		          }
						}
					}
          SERVICE <${config.CENSUS_POINT_ENDPOINT}> {
            ?c omgeo:nearby(?lat ?lon "${distance}km") .
          	?c gn:population ?populationString .
						BIND(xsd:float(?populationString) as ?population)
          }
        }
      }
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'popAround',
	params: ['nafItem', 'establishmentSize', 'department', 'distance'],
	singleResult: true,
});

const Pop = ({ pop }) => (
	<div className="mui-row">
		<div className="mui-col-md-6 mui-col-md-offset-3">
			<h2 className="centered">{`Population : ${prettyNumber(pop)}`}</h2>
		</div>
	</div>
);

export default connector(Pop, {
	loading: () => <Spinner text={D.loading} />,
});
