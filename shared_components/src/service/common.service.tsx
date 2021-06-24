import { GENERAL_COOKIES } from '../common/constants';

const setCookie = (cname: string, cvalue: string, exdays: number = 9999) => {
	let d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

const getCookie = (cname: string) => {
	let name = cname + '=';
	let ca = document.cookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}

	return '';
};

const clearCookie = () => {
	document.cookie.split(';').forEach((c) => {
		document.cookie = c
			.replace(/^ +/, '')
			.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
	});
};

const clearGeneralCookies = () => {
	const generalCookies = Object.values(GENERAL_COOKIES);
	document.cookie.split(';').forEach((c) => {
		const cookieName = generalCookies.find((item) => c.includes(item));
		if (cookieName) {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
		}
	});
};

export { setCookie, getCookie, clearCookie, clearGeneralCookies };
