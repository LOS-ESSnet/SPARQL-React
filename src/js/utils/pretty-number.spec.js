import { prettyNumber } from './pretty-number';

describe('prettyNumber', () => {
	it('undefined param should return an empty string', () => {
		expect(prettyNumber()).toEqual('');
	});
	it('empty param should return an empty string', () => {
		expect(prettyNumber('')).toEqual('');
	});
	it('number param should return prettier string', () => {
		expect(prettyNumber(1234)).toEqual('1 234');
	});
	it('0 param should return prettier "0"', () => {
		expect(prettyNumber(0)).toEqual('0');
	});
	it('should return the same string', () => {
		expect(prettyNumber('12')).toEqual('12');
	});
	it('should return one white space', () => {
		expect(prettyNumber('1234')).toEqual('1 234');
	});
	it('should return two white spaces', () => {
		expect(prettyNumber('1552100550')).toEqual('1 552 100 550');
	});
});
