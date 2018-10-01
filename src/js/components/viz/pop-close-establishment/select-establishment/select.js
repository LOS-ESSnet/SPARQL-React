import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import ReactSelect from 'js/components/shared/react-select';
import config from 'config';
import { prettyNumber } from 'js/utils/pretty-number';
import D from 'js/i18n';

const nafFilter = nafItem => (nafItem ? `?e org:purpose <${nafItem}> .` : '');
const geolocFilter = geoloc => {
	// Manage 'arrondissementMunicipal' as a 'commune'
	const geolocUpdate = geoloc.includes('/commune/')
		? geoloc
		: geoloc.replace(/arrondissementMunicipal/, 'commune');
	return geoloc ? `?e gn:locatedIn <${geolocUpdate}> .` : '';
};

const queryBuilder = (nafItem, geoloc, search) => `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      PREFIX gn: <http://www.geonames.org/ontology#>
      PREFIX org: <http://www.w3.org/ns/org#>

      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      SELECT DISTINCT ?value ?label WHERE {
        SERVICE <${config.SIRENE_ENDPOINT}> {
              select * where {
                  ?e a org:OrganizationalUnit ;
                     rdfs:label ?label ;
                     gn:locatedIn ?departement .
                  ${geolocFilter(geoloc)}
                  ${nafFilter(nafItem)}
                  BIND(STRAFTER(STR(?e),'/sirene/siret/') AS ?value) .
              }

        }
        ${search ? `FILTER(regex(?label,'${search}','i')) .` : ''}
      }
      ORDER BY ?label
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'establishmentList',
	params: ['nafItem', 'geoloc', 'search'],
});

const EntSelect = ({ establishmentList, establishment, handleChange }) => {
	const size = establishmentList.length;
	const res = size > 1 ? `${D.result}s` : `${D.result}`;
	return (
		<div className="mui-row">
			<div className="mui-col-md-6 mui-col-md-offset-3">
				<h2 className="centered">{`${D.establishmentList} (${prettyNumber(
					size
				)} ${res})`}</h2>
				<ReactSelect
					placeholder={D.selectEstablishment}
					options={establishmentList}
					value={establishment}
					onChange={e =>
						handleChange(establishmentList.find(entr => entr.value === e) || {})
					}
					searchable={true}
					unclearable={false}
				/>
			</div>
		</div>
	);
};

export default connector(EntSelect, {
	loading: () => <Spinner text={D.loading} />,
});
