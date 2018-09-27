const dictionary = {
	summary: {
		fr: 'Sommaire',
		en: 'Summary',
	},
	popEtabSubheader: {
		fr: 'Populations et établissements',
		en: 'Establishments and populations',
	},
	popEtabTitle: {
		fr: `Population à proximité des établissements`,
		en: `Population near an establishment`,
	},
	permitsSubheader: {
		fr: 'Permits de construire et populations',
		en: 'Building permits and populations',
	},
	permitsTitle: {
		fr: "Départements d'Île de France ",
		en: '" Île de France " departements',
	},
	pop5Title: {
		fr: 'Population de 15 ans et plus',
		en: '15 year or more population',
	},
	popDimensionTitle: {
		fr: "Populations départementales : vue d'ensemble",
		en: 'Departemental populations: overview',
	},
	popComparisonTitle: {
		fr: 'Structure de la population par département',
		en: 'Departemental population structure',
	},
	unemployementTitle: {
		fr: 'Cartographie du taux de chômage',
		en: 'Unemployement map',
	},
	unemployement: {
		fr: 'Taux de chômage',
		en: 'Unemployement rate',
	},
	unemployementDescription: {
		fr: 'Carte du taux de chômage des 15 ans et plus par département',
		en:
			'Map represents unemployement rate of 15 old years and more by department',
	},
	loading: {
		fr: 'Chargement en cours ...',
		en: 'Loading...',
	},
	selectModality: {
		fr: 'Sélectionner une modalité ...',
		en: 'Select a modality...',
	},
	result: {
		fr: 'résultat',
		en: 'result',
	},
	noResult: {
		fr: 'Pas de résultat',
		en: 'No results',
	},
	search: {
		fr: 'Rechercher ...',
		en: 'Search...',
	},
	between: {
		fr: 'entre',
		en: 'between',
	},
	stackedBar: {
		fr: 'Barres empilées',
		en: 'Stacked bars',
	},
	municipality: {
		fr: 'Commune',
		en: 'Municipality',
	},
	department: {
		fr: 'Departement',
		en: 'Department',
	},
	region: {
		fr: 'Région',
		en: 'Region',
	},
	fixDimension: {
		fr: 'Fixer une dimension ...',
		en: 'Fix your dimension...',
	},
	fixFirstDimension: {
		fr: 'Fixer une première dimension ...',
		en: 'Fix your first dimension...',
	},
	fixSecondDimension: {
		fr: 'Fixer une deuxième dimension ...',
		en: 'Fix your second dimension...',
	},
	fixFirstDepartment: {
		fr: 'Fixer un premier département ...',
		en: 'Fix your first department...',
	},
	fixSecondDepartment: {
		fr: 'Fixer un deuxième département ...',
		en: 'Fix your second department...',
	},
	inhabitantEstablishment: {
		fr: (sommePop, distance, labelEntreprise) =>
			`Il y a ${sommePop} habitants à ${distance} km autour de " ${labelEntreprise} "`,
		en: (sommePop, distance, labelEntreprise) =>
			`There are ${sommePop} inhabitants à ${distance} km around " ${labelEntreprise} "`,
	},
	permitDescription: {
		fr:
			"Les population légales sont issues du id.insee.fr et le nombre de permis de construire sont calculés à partir d'un cube",
		en:
			'Legal populations from id.insee.fr and building permits calculated into data cube.',
	},
	permits: {
		fr: 'Permis',
		en: 'Permits',
	},
	changeYear: {
		fr: "Changer d'année ...",
		en: 'Change year...',
	},
	slideDistance: {
		fr: "Faire glisser le curseur pour changer la distance à l'établissement",
		en: 'Slide to change the distance from the establishment',
	},
	departmentTitle: {
		fr: 'Département ...',
		en: 'Department...',
	},
	selectDepartment: {
		fr: 'Sélectionner un département ...',
		en: 'Select a department...',
	},
	activityTitle: {
		fr: 'Activité ...',
		en: 'Activity...',
	},
	selectActivity: {
		fr: 'Sélectionner une activité ...',
		en: 'Select an activity...',
	},
	searchEstablishment: {
		fr: 'Filtrer les établissements par nom ...',
		en: 'Search in establishment name...',
	},
	searchCondition: {
		fr: 'sélectionner au moins une commune ou une activité et un département',
		en: 'select at least a municipality or an activity and a department',
	},
	municipalityTitle: {
		fr: 'Commune ...',
		en: 'Municipality...',
	},
	selectMunicipality: {
		fr: 'Sélectionner une commune ...',
		en: 'Select a municipality...',
	},
	selectEstablishment: {
		fr: 'Sélectionner un établissement ...',
		en: 'Select an establishment...',
	},
	establishmentList: {
		fr: 'Liste des établissements',
		en: 'Establishment list',
	},
	dataSource: {
		fr: 'Source des données :',
		en: 'Data source:',
	},
	chooseArea: {
		fr: 'Choisir un territoire ...',
		en: 'Choose an area...',
	},
	tableTitle: {
		fr: 'Tableau',
		en: 'Table',
	},
	chartTitle: {
		fr: 'Graphique',
		en: 'Chart',
	},
	municipalityIntoDepartment: {
		fr: 'Communes dans le département...',
		en: 'Municipalities into department...',
	},
	selectGeography: {
		fr: 'Selectionner une maille géographique ...',
		en: 'Select a geography...',
	},
	partOf: {
		fr: 'Part des',
		en: 'Part of',
	},
};

export default dictionary;