import { sparqlConnect } from 'sparql-connect';

const queryBuilder = dimension => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
select ?id ?label where {
	<${dimension}> qb:codeList ?codeList .
    ?id skos:inScheme ?codeList .
    ?id skos:prefLabel ?label .
}
ORDER BY ?label
`;

export default sparqlConnect(queryBuilder, {
	queryName: 'dimensionModalities',
	params: ['dimension'],
});
