import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Population from './population';
import Map from './map-container';
import config from 'config';
import { prettyNumber } from 'js/utils/pretty-number';
import D from 'js/i18n';

const nafFilter = nafItem =>
	nafItem ? `?value org:purpose <${nafItem}> .` : '';
const estabSizeFilter = etabSize =>
	etabSize ? `?value dim-etab:effectif <${etabSize}> .` : '';
const depFilter = department =>
	department ? `?value gn:locatedIn <${department}> .` : '';

const queryBuilder = (nafItem, establishmentSize, department) => `
      PREFIX org: <http://www.w3.org/ns/org#>
      PREFIX dim-etab: <http://id.insee.fr/sirene/etablissement/>
      PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>
			PREFIX gn: <http://www.geonames.org/ontology#>

      SELECT (count(?value) as ?nbEstab) WHERE {
        SERVICE <${config.SIRENE_ENDPOINT}> {
            ?value a org:OrganizationalUnit ;
               geo-pos:long ?lon .
               ${nafFilter(nafItem)}
               ${estabSizeFilter(establishmentSize)}
							 ${depFilter(department)}
               FILTER(STR(?lon) != '')
        }
      }
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'nbEstablishment',
	params: ['nafItem', 'establishmentSize', 'department'],
	singleResult: true,
});

const NbEstab = ({
	nbEstab,
	nafItem,
	department,
	establishmentSize,
	distance,
}) => {
	const size = parseInt(nbEstab, 10);
	const printMap = size !== 0 && size <= 1000;
	return (
		<React.Fragment>
			<div className="mui-row">
				<div className="mui-col-md-6 mui-col-md-offset-3">
					<h2 className="centered">{`${prettyNumber(
						nbEstab
					)} establishments`}</h2>
				</div>
			</div>
			{printMap && (
				<React.Fragment>
					<Population
						nafItem={nafItem}
						establishmentSize={establishmentSize}
						department={department}
						distance={distance}
					/>
					<Map
						nafItem={nafItem}
						establishmentSize={establishmentSize}
						department={department}
						distance={distance}
					/>
				</React.Fragment>
			)}
			{!printMap && (
				<div className="centered pink">
					<h2>
						<b>{D.tooMuchEstablishment}</b>
					</h2>
				</div>
			)}
		</React.Fragment>
	);
};

export default connector(NbEstab, {
	loading: () => <Spinner text={D.loading} />,
});
