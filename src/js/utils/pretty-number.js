export const prettyNumber = num =>
	num ? num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
