import React from 'react';
import NbEstablishments from './nb-establishments';

export default ({ nafItem, establishmentSize, department, distance }) => (
	<React.Fragment>
		<NbEstablishments
			nafItem={nafItem}
			establishmentSize={establishmentSize}
			distance={distance}
			department={department}
		/>
	</React.Fragment>
);
