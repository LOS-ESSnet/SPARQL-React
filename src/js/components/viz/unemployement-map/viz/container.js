import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Viz from './viz';
import Spinner from 'js/components/shared/spinner';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = () => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX cog2017-dep: <http://id.insee.fr/codes/cog2017/departement/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>

select ?label ?activePop ?unemployedPop ?contours where {
    {
        select (sum(?pop) as ?activePop) ?area where {
            ?obs a qb:Observation .
            ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
            ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?area.
            ?area skos:topConceptOf <http://id.insee.fr/codes/cog2017/departementsOuCommunesOuArrondissementsMunicipaux>.
            ?obs <http://id.insee.fr/meta/dimension/tactr> ?tactr .
            VALUES ?tactr {<http://id.insee.fr/codes/tactr/11> <http://id.insee.fr/codes/tactr/12>}
        }
        GROUP BY ?area
    }
    {
        select (sum(?pop) as ?unemployedPop) ?area where {
            ?obs a qb:Observation .
            ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
            ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?area.
            ?area skos:topConceptOf <http://id.insee.fr/codes/cog2017/departementsOuCommunesOuArrondissementsMunicipaux>.
            ?obs <http://id.insee.fr/meta/dimension/tactr> ?tactr .
            VALUES ?tactr {<http://id.insee.fr/codes/tactr/12>}
        }
        GROUP BY ?area
    }
    ?area skos:prefLabel ?label .
    ?area foaf:focus ?areaInsee .
    SERVICE <${config.NUTS_ENDPOINT}> {
    ?areaIGN owl:sameAs ?areaInsee .
        ?areaIGN geo:hasGeometry ?geometry .
    ?geometry geo:asWKT ?contours .
    }
}
ORDER BY DESC(?pop15plus)
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'unemployementData',
});

const VizContainer = ({ unemployementData }) => (
	<div>
		<Viz data={unemployementData} />
	</div>
);

export default connector(VizContainer, {
	loading: () => <Spinner text={D.loading} />,
});
