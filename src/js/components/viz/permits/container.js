import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import Viz from './viz';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = () => `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX dimgeo: <http://id.insee.fr/meta/dimension/GEO/>
PREFIX mes: <http://id.insee.fr/meta/mesure/> PREFIX sdmxdim: <http://purl.org/linked-data/sdmx/2009/dimension#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX idemo:<http://rdf.insee.fr/def/demo#>
PREFIX igeo:<http://rdf.insee.fr/def/geo#>

PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select ?nutsId ?period ?departement ?permits ?nom ?popTotale where {
    {
      SELECT ?nutsId (sum(?mes) as ?permits) ?period WHERE {
          SERVICE <${config.PLOSH_ENDPOINT}> {
              ?obs qb:dataSet <http://data.insee.fr/dataset/BUILDING_PERMITS> .
              ?obs dimgeo:NUTS/skos:notation ?nutsId .
              ?obs sdmxdim:timePeriod ?period .
              ?obs mes:NBPE ?mes .
          }
      }
      GROUP BY ?nutsId ?period
    }
    SERVICE <${config.NUTS_ENDPOINT}> {
       ?nutsEuro owl:sameAs ?departement .
          ?nutsEuro dc:identifier ?nutsId
    }
    SERVICE <${config.INSEE_ENDPOINT}> {
    ?departement igeo:nom ?nom .
    ?departement rdf:type igeo:Departement .
    ?departement idemo:population ?popLeg .
    ?popLeg idemo:populationTotale ?popTotale ;
           idemo:date ?date .
          FILTER(STR(year(?date))=?period)
    }
}
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'permitsByDep',
});

export default connector(Viz, {
	loading: () => <Spinner text={D.loading} />,
});
