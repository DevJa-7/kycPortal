import React from 'react';
import { mount } from 'enzyme';
import App from '../shared/App';
import { TEST_AUTH_INFO } from './common/constants';
import { _getLoadingState } from '../store/selectors';

const Component = () => {
    return (
        <App />
    );
};

describe('Test for login page :', () => {
    let wrapper: any;
    
    wrapper = mount(<Component/>);

    /**
     * Login in authenticated user
     */
    describe('Should be logged in with authenticated user.', () => {
        beforeAll(async () => {
            const userName = TEST_AUTH_INFO.signedAuth.name;
            const userPass = TEST_AUTH_INFO.signedAuth.pass;
            
            // Set username
            const elementNameForUsername = 'input#email';
            const elementObjForUsername = wrapper.find(elementNameForUsername);        
            const eventChangeUsername = {
                target: { value: userName }
            };

            elementObjForUsername.simulate('change', eventChangeUsername);

            // Set username
            const elementNameForPassword = 'input#standard-adornment-password';
            const elementObjForPassword = wrapper.find(elementNameForPassword);        
            const eventChangePassword = {
                target: { value: userPass }
            };
            
            elementObjForPassword.simulate('change', eventChangePassword);

            // Click button 'SignIn'
            const btnSignInName = 'button#sign-in';
            const objBtnSignIn = wrapper.find(btnSignInName);
            objBtnSignIn.simulate('click');
            
            // Update
            return wrapper.update();
        }, 7000);
        
        it('Should show verification page', () => {
            // console.log('history', window.location.pathname)
            expect(wrapper).not.toBeNull();
        });
    });
});