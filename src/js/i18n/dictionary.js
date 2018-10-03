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
		fr: `Population à proximité d'un établissement`,
		en: `Population near an establishment`,
	},
	popEtabsTitle: {
		fr: `Population à proximité d'un type d'établissement`,
		en: `Population near a type of establishment`,
	},
	permitsSubheader: {
		fr: 'Permis de construire et populations',
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
	establishment: {
		fr: 'établissement',
		en: 'establishment',
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
			`There are ${sommePop} inhabitants ${distance} km around " ${labelEntreprise} "`,
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
	distanceTitle: {
		fr: "Eloignement de l'établissement ...",
		en: 'Distance from the establishment...',
	},
	selectDistance: {
		fr: 'Sélectionner une distance ...',
		en: 'Select a distance...',
	},
	searchEstablishment: {
		fr: 'Filtrer les établissements par nom ...',
		en: 'Search in establishment name...',
	},
	searchCondition: {
		fr: 'sélectionner au moins une commune ou une activité et un département',
		en: 'select at least a municipality or an activity and a department',
	},
	searchSimpleCondition: {
		fr:
			"sélectionner au moins une distance et une tranche d'effectif ou une activité",
		en: 'select at least a distance and an effectif slice or an activity',
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
		fr: 'Communes dans le département ...',
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
	establishmentSize: {
		fr: "Effectif de l'établissement ...",
		en: 'Staff of the establishment...',
	},
	selectSize: {
		fr: "Sélectionner une tranche d'effectif établissement ...",
		en: 'Select a slice...',
	},
	tooMuchEstablishment: {
		fr: nb =>
			`Votre recherche comporte plus de 1 000 établissements (${nb}). Veuiller la préciser en filtrant plus précisément`,
		en: nb =>
			`Your search returns more than 1 000 establishments (${nb}). Please specify more using filters`,
	},
	tooMuchDistance100: {
		fr: nb =>
			`Votre recherche comporte plus de 100 établissements (${nb}). Veuiller sélectionner une distance inférieure à 3 km`,
		en: nb =>
			`Your search returns more than 100 establishments (${nb}). Please select a distance lower than 3 km`,
	},
	tooMuchDistance50: {
		fr: nb =>
			`Votre recherche comporte plus de 50 établissements (${nb}). Veuiller sélectionner une distance inférieure à 5 km`,
		en: nb =>
			`Your search returns more than 50 establishments (${nb}). Please select a distance lower than 5 km`,
	},
	tooMuchDistance30: {
		fr: nb =>
			`Votre recherche comporte plus de 30 établissements (${nb}). Veuiller sélectionner une distance inférieure à 10 km`,
		en: nb =>
			`Your search returns more than 30 establishments (${nb}). Please select a distance lower than 10 km`,
	},
};

export default dictionary;
