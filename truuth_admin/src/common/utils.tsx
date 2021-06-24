import { AUTH_ROLE } from 'shared_components/src/common/constants';

export const gotoStartPage = (history, userRoles) => {
	if (userRoles === AUTH_ROLE.verifier) {
		history.push('/manual-verification');
	} else {
		history.push('/verification');
	}
};
