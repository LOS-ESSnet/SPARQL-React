export const filterDimensions = (dimensions, excludedDimensions) =>
	excludedDimensions && excludedDimensions.length !== 0
		? dimensions.reduce((_, d) => {
				if (!excludedDimensions.includes(d.id)) _.push(d);
				return _;
		  }, [])
		: dimensions;
