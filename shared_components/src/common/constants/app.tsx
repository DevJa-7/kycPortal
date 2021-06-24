// APP_URL_PREFIX
export const APP_URL_PREFIX = process.env.PUBLIC_URL || '/kyc';

// AWS Amplify
export const AWS_AMPLIFY_AUTH_REGION_DEFAULT = 'ap-southeast-2';
export const AWS_AMPLIFY_AUTH_IDENTITYPOOL_REGION_DEFAULT = 'ap-southeast-2';
export const AWS_AMPLIFY_AUTH_MANDATORY_SIGNIN_DEFAULT = true;

// Configuration Base Url
export const CONFIGURATION_BASE_URL = process.env.REACT_APP_CONFIGURATION_BASE_URL;

// Images Base Url
export const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL;

/**
 * IConfiguration
 */
export interface IConfiguration {
	tenantName: string;
	logo: string;
	apiUrl: string;
	cognito: {
		userpoolId: string;
		clientId: string;
	};
	style: {
		primaryColor: {
			main: string;
		};
		secondaryColor: {
			light: string;
			main: string;
			dark: string;
		};
		theme: string;
		cssFile: string;
	};
}

// app version number
export const APP_VERSION_NUMBER = 'v1.5.0+504';
