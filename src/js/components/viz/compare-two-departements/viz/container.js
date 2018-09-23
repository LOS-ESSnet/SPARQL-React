import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Viz from './viz';
import Spinner from 'js/components/shared/spinner';
import D from 'js/i18n';

const queryBuilder = (dimension, idDepA, idDepB) => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

select ?dimLabel ?dep (sum(?pop) as ?popByDim) where {
?obs a qb:Observation .
        ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
        ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?dep .
        VALUES ?dep {<${idDepA}> <${idDepB}>} .
        ?obs <${dimension}> ?dim .
        ?dim skos:notation ?notation .
        ?dim skos:prefLabel ?dimLabel .
}
GROUP BY ?dimLabel ?dep
ORDER BY DESC(?notation)
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'popDepByDim',
	params: ['dimension', 'idDepA', 'idDepB'],
});

const VizContainer = ({
	popDepByDim,
	depA,
	depB,
	valueTabs,
	handleChangeTabsValue,
}) => (
	<div>
		<Viz
			data={popDepByDim}
			depA={depA}
			depB={depB}
			valueTabs={valueTabs}
			handleChangeTabsValue={handleChangeTabsValue}
		/>
	</div>
);

export default connector(VizContainer, {
	loading: () => <Spinner text={D.loading} />,
});
