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
	const warning = buildWarning(parseInt(distance, 10), size);
	console.log(warning);
	const res = size > 1 ? `${D.establishment}s` : `${D.establishment}`;
	return (
		<React.Fragment>
			{!warning && (
				<React.Fragment>
					<div className="mui-row">
						<div className="mui-col-md-6 mui-col-md-offset-3">
							<h2 className="centered">{`${prettyNumber(nbEstab)} ${res}`}</h2>
						</div>
					</div>
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
			{warning && (
				<div className="centered pink">
					<h2>
						<b>{warning}</b>
					</h2>
				</div>
			)}
		</React.Fragment>
	);
};

const buildWarning = (distance, nbEstab) => {
	const strNbEstab = prettyNumber(nbEstab);
	if (nbEstab === 0) return D.noResult;
	else if (nbEstab > 1000) return D.tooMuchEstablishment(strNbEstab);
	else if (nbEstab > 100 && distance > 2)
		return D.tooMuchDistance100(strNbEstab);
	else if (nbEstab > 50 && distance > 3) return D.tooMuchDistance50(strNbEstab);
	else if (nbEstab > 30 && distance > 5) return D.tooMuchDistance30(strNbEstab);
	else return '';
};

export default connector(NbEstab, {
	loading: () => <Spinner text={D.loading} />,
});
