import { getCookie, setCookie, delCookie } from '../../src/utils';
describe("Cookie utils", function() {
	testCookieKey = 'TEST_KEY';
	testCookieValue = 'TEST_VALUE';
	afterEach(function() {
		delCookie(testCookieKey);
	});
	describe("delCookie function", function() {
		it("delcookie with no arguments should change nothing", function() {
			setCookie(testCookieKey, testCookieValue);
			delCookie();
			expect(document.cookie).toEqual(`${testCookieKey}=${testCookieValue}`);
		});
		it("delcookie works with only key param", function() {
			setCookie(testCookieKey, testCookieValue);
			delCookie(testCookieKey);
			expect(document.cookie).toEqual(``);
		});
		it("delcookie works with key and value param", function() {
			setCookie(testCookieKey, testCookieValue);
			delCookie(testCookieKey, testCookieValue);
			expect(document.cookie).toEqual(``);
		});
		it("delcookie works with only value param", function() {
			setCookie('', testCookieValue);
			delCookie('', testCookieValue);
			expect(document.cookie).toEqual(``);
		});
	});
	describe("setCookie function works without expires", function() {
		it("cookie with empty string key should be set", function() {
			setCookie('', testCookieValue);
			expect(document.cookie).toEqual(`${testCookieValue}`);
			delCookie('', testCookieValue);
		});
		it("cookie should be set", function() {
			setCookie(testCookieKey, testCookieValue);
			expect(document.cookie).toEqual(`${testCookieKey}=${testCookieValue}`);
		});
		it("cookie with empty string value should be set", function() {
			setCookie(testCookieKey, '');
			expect(document.cookie).toEqual(`${testCookieKey}=`);
		});
		it("muiltin set cookie value", function() {
			setCookie(testCookieKey, '');
			setCookie(testCookieKey, 'abc');
			setCookie(testCookieKey, testCookieValue);
			expect(document.cookie).toEqual(`${testCookieKey}=${testCookieValue}`);
		});
	});
});
