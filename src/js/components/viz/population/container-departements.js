import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Viz from './viz';
import Spinner from 'js/components/shared/spinner';
import D from 'js/i18n';

const queryBuilder = () => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX cog2017-dep: <http://id.insee.fr/codes/cog2017/>

select ?label ?pop15plus where {
  {
      select (sum(?pop) as ?pop15plus) ?departement where {
          ?obs a qb:Observation .
          ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
          ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?departement.
          ?departement skos:topConceptOf cog2017-dep:departementsOuCommunesOuArrondissementsMunicipaux.
      }
      GROUP BY ?departement
  }
  ?departement skos:prefLabel ?label .
}
ORDER BY DESC(?pop15plus)
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'departementPopulation',
});

const ContainerDepartements = ({ departementPopulation }) => (
	<Viz data={departementPopulation} />
);

export default connector(ContainerDepartements, {
	loading: () => <Spinner text={D.loading} />,
});
