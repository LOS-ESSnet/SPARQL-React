import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Viz from './viz';
import Spinner from 'js/components/shared/spinner';
import D from 'js/i18n';

const queryBuilder = () => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX cog2017-dep: <http://id.insee.fr/codes/cog2017/>
PREFIX igeo:<http://rdf.insee.fr/def/geo#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

select ?label (sum(?pop15plusDep) as ?pop15plus) where {
  {
      select (sum(?pop) as ?pop15plusDep) ?departement where {
          ?obs a qb:Observation .
          ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
          ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?departement.
          ?departement skos:topConceptOf cog2017-dep:departementsOuCommunesOuArrondissementsMunicipaux.
      }
      GROUP BY ?departement
  }
  ?departement foaf:focus ?departementInsee .
  SERVICE <http://id.insee.fr/sparql> {
    ?region a igeo:Region .
    ?region igeo:nom ?label .
    ?region igeo:subdivision ?departementInsee .
    }
}
GROUP BY (?label)
ORDER BY DESC(?pop15plus)
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'regionPopulation',
});

const ContainerRegions = ({ regionPopulation }) => (
	<Viz data={regionPopulation} />
);

export default connector(ContainerRegions, {
	loading: () => <Spinner text={D.loading} />,
});
