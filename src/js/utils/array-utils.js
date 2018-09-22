export const deleteLabelFromArray = array =>
	array.reduce((_, a) => {
		const { label,...newObj } = a;
		_.push(newObj);
		return _;
	}, []);
export const extractLabel = array =>
	(array && array.length !== 0 && array[0].label) || '';

export const extractFieldFromArray = (array, field) =>
	array && array.length !== 0
		? array.reduce((_, a) => {
				_.push(parseFloat(a[field], 10));
				return _;
		  }, [])
		: [];

export const sum = array =>
	array ? array.reduce((_, a) => _ + parseFloat(a), 0) : 0;
