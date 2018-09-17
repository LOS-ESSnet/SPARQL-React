import { sparqlConnect } from 'sparql-connect';

const queryBuilder = dsd => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
select ?id ?label where {
    <${dsd}> qb:component/qb:dimension ?id .
    ?id rdfs:label ?label .
}
ORDER BY ?label
`;

export default sparqlConnect(queryBuilder, {
	queryName: 'dimensions',
	params: ['dsd'],
});
