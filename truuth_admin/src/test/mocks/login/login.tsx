import { 
    ITestContent, 
    TYPE_TEST_CONTENT 
} from '../../common/types';

const elements = {
    divMuiDialogRoot: 'div.MuiDialog-root',
};

export const loginTestContents: ITestContent[] = [
    { name: 'String \"Welcome To\"', text: 'WELCOME TO', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Button \"SIGN IN\"', text: 'SIGN IN', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Link \"Forgot Password ?\"', element: 'a#forgot-password', type: TYPE_TEST_CONTENT.ELEMENT},
];

export const forgotPasswordNotificationTestContents: ITestContent[] = [
    { name: 'Modal', element: elements.divMuiDialogRoot, type: TYPE_TEST_CONTENT.ELEMENT},
    { name: 'You have entered the wrong password too many times.', text: 'You have entered the wrong password too many times.', type: TYPE_TEST_CONTENT.STRING},
];

export const forgotPasswordTestContents: ITestContent[] = [
    { name: 'Modal', element: elements.divMuiDialogRoot, type: TYPE_TEST_CONTENT.ELEMENT},
    { name: 'The title \"Forgot Password?\"', text: 'Forgot Password?', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Button \"SEND CODE\"', text: 'SEND CODE', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Input for Email', element: 'input#email', type: TYPE_TEST_CONTENT.ELEMENT},
];

export const sendCodeTestContents: ITestContent[] = [
    { name: 'Modal', element: elements.divMuiDialogRoot, type: TYPE_TEST_CONTENT.ELEMENT},
    { name: 'The title \"Reset Password?\"', text: 'Reset Password?', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Enter your code sent to ', text: 'Enter your code sent to', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Button \"Verify\"', text: 'VERIFY', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Button \"RESEND CODE\"', element: 'RESEND CODE', type: TYPE_TEST_CONTENT.STRING},
];

export const resetPasswordTestContents: ITestContent[] = [
    { name: 'Modal', element: elements.divMuiDialogRoot, type: TYPE_TEST_CONTENT.ELEMENT},
    { name: 'The title \"Reset Password?\"', text: 'Reset Password?', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Button \"SUBMIT\"', text: 'SUBMIT', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Code Verified', text: 'Code Verified', type: TYPE_TEST_CONTENT.STRING},
    { name: 'Create New Password', text: 'Create New Password', type: TYPE_TEST_CONTENT.STRING},
];