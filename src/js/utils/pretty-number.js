export const prettyNumber = num =>
	num !== undefined ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '';
