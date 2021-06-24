import {
    ITestContent,
    TYPE_TEST_CONTENT
} from '../../common/types';

export const qrPageContent: ITestContent[] = [
    { name: 'String \"has sent a request for you to verify your identity but it looks like you’re not on your phone.\"',
    text: 'has sent a request for you to verify your identity but it looks like you’re not on your phone.',
    type: TYPE_TEST_CONTENT.STRING},
    { name: 'li \"Open your Phone Camera\"', element: 'li', type: TYPE_TEST_CONTENT.ELEMENT},
    { name: 'li \"Scan the QR Code\"', element: 'li', type: TYPE_TEST_CONTENT.ELEMENT},
];
