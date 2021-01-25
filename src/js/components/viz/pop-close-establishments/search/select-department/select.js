import React from 'react';
import { sparqlConnect } from 'sparql-connect';
import Spinner from 'js/components/shared/spinner';
import ReactSelect from 'js/components/shared/react-select';
import config from 'config';
import D from 'js/i18n';

const queryBuilder = () => `
          PREFIX igeo:<http://rdf.insee.fr/def/geo#>
		  PREFIX owl:<http://www.w3.org/2002/07/owl#>
          SELECT ?value ?label WHERE {
            SERVICE <${config.INSEE_ENDPOINT}> {
          	?dep a igeo:Departement .
          	?dep igeo:codeINSEE ?code .
          	?dep igeo:nom ?lab .
			?dep owl:sameAs ?value .
            BIND(concat(STR(?code)," - ",STR(?lab)) as ?label)
          }
        }
        order by ?value
`;

const connector = sparqlConnect(queryBuilder, {
	queryName: 'depList',
});

const DepSelect = ({ depList, department, handleChange }) => {
	const depMetro = depList.filter(d => {
		const array = d.value.split('/');
		return array[array.length - 1].length === 2;
	});
	return (
		<div>
			<h2 className="centered">{D.departmentTitle}</h2>
			<ReactSelect
				placeholder={D.selectDepartment}
				options={depMetro}
				value={department ? depMetro.find(d => d.value === department) : ''}
				onChange={handleChange}
				searchable={true}
			/>
		</div>
	);
};

export default connector(DepSelect, {
	loading: () => <Spinner text={D.loading} />,
});
