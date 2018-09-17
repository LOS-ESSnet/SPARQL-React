import { sparqlConnect } from 'sparql-connect';

const queryBuilder = () => `
    PREFIX  skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX cog2017-dep: <http://id.insee.fr/codes/cog2017/>

    SELECT DISTINCT ?label ?id where {
      ?id skos:topConceptOf cog2017-dep:departementsOuCommunesOuArrondissementsMunicipaux .
      ?id skos:prefLabel ?label
    }
    ORDER BY ?label
`;

export default sparqlConnect(queryBuilder, {
	queryName: 'departements',
});
