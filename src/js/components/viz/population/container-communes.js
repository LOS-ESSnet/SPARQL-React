import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Viz from './viz';
import Spinner from 'js/components/shared/spinner';
import D from 'js/i18n';

const queryBuilder = departement => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX cog2017-dep: <http://id.insee.fr/codes/cog2017/>

select ?label ?pop15plus where {
  {
      select (sum(?pop) as ?pop15plus) ?commune where {
          ?obs a qb:Observation .
          ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
          ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?commune.
          ?commune skos:broader <${departement}>
      }
      GROUP BY ?commune
  }
  ?commune skos:prefLabel ?label .
}
ORDER BY DESC(?pop15plus)
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'communePopulation',
	params: ['departement'],
});

const ContainerCommunes = ({ communePopulation }) => (
	<Viz data={communePopulation} />
);

export default connector(ContainerCommunes, {
	loading: () => <Spinner text={D.loading} />,
});
