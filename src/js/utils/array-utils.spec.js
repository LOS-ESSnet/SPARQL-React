import {
	deleteLabelFromArray,
	extractLabel,
	extractFieldFromArray,
	sum,
} from './array-utils';

describe('array-utils', () => {
	describe('deleteLabelFromArray', () => {
		it('should return empty array', () => {
			expect(deleteLabelFromArray([])).toEqual([]);
		});
		it('should return the same array', () => {
			const input = [{ name: 'toto', id: '1' }, { name: 'titi', id: '2' }];
			expect(deleteLabelFromArray(input)).toEqual(input);
		});
		it('should return array without label in objects', () => {
			const input = [{ label: 'toto', id: '1' }, { label: 'titi', id: '2' }];
			const res = [{ id: '1' }, { id: '2' }];
			expect(deleteLabelFromArray(input)).toEqual(res);
		});
	});
	describe('extractLabel', () => {
		it('should return false', () => {
			expect(extractLabel()).toEqual('');
		});
		// it('should return empty string', () => {
		// 	expect(extractLabel([{ name: 'toto' }])).toEqual('');
		// });
		it('should return label', () => {
			const input = [
				{ label: 'areaLabel', x: '1', y: '2' },
				{ label: 'areaLabel', x: '2', y: '4' },
			];
			expect(extractLabel(input)).toEqual('areaLabel');
		});
	});
	describe('extractFieldFromArray', () => {
		it('empty param should return empty array', () => {
			expect(extractFieldFromArray(undefined, 'x')).toEqual([]);
		});
		it('empty array param should return empty array', () => {
			expect(extractFieldFromArray([], 'x')).toEqual([]);
		});
		it('should return new array', () => {
			const input = [
				{ label: 'areaLabel', x: '1', y: '2' },
				{ label: 'areaLabel', x: '2', y: '4' },
			];
			expect(extractFieldFromArray(input, 'x')).toEqual([1, 2]);
		});
	});

	describe('sum', () => {
		it('empty param should return 0', () => {
			expect(sum()).toEqual(0);
		});
		it('empty array param should return 0', () => {
			expect(sum([])).toEqual(0);
		});
		it('should return sum', () => {
			expect(sum([1, 2])).toEqual(3);
		});
	});
});
