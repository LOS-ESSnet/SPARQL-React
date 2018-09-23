import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Viz from './viz';
import Spinner from 'js/components/shared/spinner';
import D from 'js/i18n';

const queryBuilder = (modA, modB) => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX cog2017-dep: <http://id.insee.fr/codes/cog2017/>

select ?label ?pop15plusModAModB (?pop15plusModA/?pop15plusTot*100 as ?partModA) ( ?pop15plusModB/?pop15plusTot*100 as ?partModB)  where {
	{
      select (sum(?pop) as ?pop15plusModAModB) ?departement where {
          ?obs a qb:Observation .
          ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
          ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?departement.
          ?obs ?dimA <${modA}> .
          ?obs ?dimB <${modB}> .
          ?departement skos:topConceptOf cog2017-dep:departementsOuCommunesOuArrondissementsMunicipaux.
      }
      GROUP BY ?departement
	}
    {
      select (sum(?pop) as ?pop15plusModB) ?departement where {
          ?obs a qb:Observation .
          ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
          ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?departement.
          ?obs ?dimB <${modB}> .
          ?departement skos:topConceptOf cog2017-dep:departementsOuCommunesOuArrondissementsMunicipaux.
      }
      GROUP BY ?departement
	}
    {
      select (sum(?pop) as ?pop15plusModA) ?departement where {
          ?obs a qb:Observation .
          ?obs <http://id.insee.fr/meta/mesure/pop15Plus> ?pop .
          ?obs <http://id.insee.fr/meta/cog2017/dimension/DepartementOuCommuneOuArrondissementMunicipal> ?departement.
          ?obs ?dimA <${modA}> .
          ?departement skos:topConceptOf cog2017-dep:departementsOuCommunesOuArrondissementsMunicipaux.
      }
      GROUP BY ?departement
	}
    {
      select (sum(?pop) as ?pop15plusTot) ?departement where {
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
	queryName: 'depPopByDimensions',
	params: ['modA', 'modB'],
});

const VizContainer = ({ depPopByDimensions, labelModA, labelModB }) => (
	<div>
		<Viz
			data={depPopByDimensions}
			labelModA={labelModA}
			labelModB={labelModB}
		/>
	</div>
);

export default connector(VizContainer, {
	loading: () => <Spinner text={D.loading} />,
});
