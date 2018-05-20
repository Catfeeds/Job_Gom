import { insertQuery } from '../../src/utils'
describe("String utils", function() {
	describe("insertQuery function", function() {
		it("insertQuery with no queryJson should work", function() {
			let hosts = ['https://github.com/aaa/bbb?qqq#ccc'];
			for (let i in hosts) {
				let host = hosts[i];
				let newhost = insertQuery(host);
				expect(newhost).toEqual(false);
				newhost = insertQuery(host, {});
				expect(newhost).toEqual(false);
			}
		});
		it("ggg.hhh.com/aaa/bbb?qqq.hhh&www#ccc should work", function() {
			let host = 'ggg.hhh.com/aaa/bbb?qqq.hhh&www#ccc';
			let newhost = insertQuery(host, { field1: 'field1Val', field2: 'field2Val' });
			expect(newhost).toBe('ggg.hhh.com/aaa/bbb?qqq.hhh&www&field1=field1Val&field2=field2Val#ccc');
		});
		it("https://ggg.hhh.com/aaa/bbb?qqq.hhh&www#ccc should work", function() {
			let host = 'https://ggg.hhh.com/aaa/bbb?qqq.hhh&www#ccc';
			let newhost = insertQuery(host, { field1: 'field1Val', field2: 'field2Val' });
			expect(newhost).toBe('https://ggg.hhh.com/aaa/bbb?qqq.hhh&www&field1=field1Val&field2=field2Val#ccc');
		});
		it("https://ggg.hhh.com/aaa/bbb#ccc should work", function() {
			let host = 'https://ggg.hhh.com/aaa/bbb#ccc';
			let newhost = insertQuery(host, { field1: 'field1Val', field2: 'field2Val' });
			expect(newhost).toBe('https://ggg.hhh.com/aaa/bbb?field1=field1Val&field2=field2Val#ccc');
		});
		it("https://ggg.hhh.com.cn#ccc should work", function() {
			let host = 'https://ggg.hhh.com.cn#ccc';
			let newhost = insertQuery(host, { field1: 'field1Val', field2: 'field2Val' });
			expect(newhost).toBe('https://ggg.hhh.com.cn?field1=field1Val&field2=field2Val#ccc');
		});
		it("https://ggg.hhh.com.cn should work", function() {
			let host = 'https://ggg.hhh.com.cn';
			let newhost = insertQuery(host, { field1: 'field1Val', field2: 'field2Val' });
            // browser can accept https://ggg.hhh.com.cn?field1=field1
			expect(newhost).toBe('https://ggg.hhh.com.cn?field1=field1Val&field2=field2Val');
		});
		it("https://ggg.hhh.com.cn/ should work", function() {
			let host = 'https://ggg.hhh.com.cn/';
			let newhost = insertQuery(host, { field1: 'field1Val', field2: 'field2Val' });
			expect(newhost).toBe('https://ggg.hhh.com.cn/?field1=field1Val&field2=field2Val');
		});
	});
    describe("stringSplice function", function() {

    });
});
