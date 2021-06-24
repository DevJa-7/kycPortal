import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { LoginPage } from '../../pages/login';

import store from '../../store';
import { TEST_AUTH_INFO } from '../common/constants';
import { 
    forgotPasswordTestContents, 
    loginTestContents, 
    forgotPasswordSubmitTestContents 
} from '../mocks/login/login';
import { getTestForContents } from '../common/utils';

const Component = () => {
    return (
        <Provider store={store}>
            <LoginPage />
        </Provider>
    );
};

describe('Test for login page :', () => {
    let wrapper: any;
    
    wrapper = mount(<Component/>);

    /** 
     *  Check if redering.
     */
    it('Check rendering', () => {
      expect(wrapper).not.toBeNull();
    });

    /** 
     *  Check if some elements exist.
     */
    getTestForContents(wrapper, loginTestContents);
    
    /** 
     *  Check if some elements work correctly.
     */
    // Check input Email
    it('Should be able to enter email.', done => {
        const defaultValue = TEST_AUTH_INFO.signedAuth.username;
        
        const elementName = 'input#email';
        
        // Check if element exists.
        const elementObj = wrapper.find(elementName);
        expect(elementObj).not.toBeNull();

        // Simulate working of element.
        const event = {
            target: { value: defaultValue }
        };
        
        elementObj.simulate('change', event);
        wrapper.update();

        // Check if element's value is changed.
        const modifiedElementObj = wrapper.find(elementName);
        expect(modifiedElementObj.prop('value')).toEqual(defaultValue);

        done();
    });

    // Check input password
    it('Should be able to enter password.', done => {
        const defaultValue = TEST_AUTH_INFO.signedAuth.password;
        
        const elementName = 'input#standard-adornment-password';
        
        // Check if element exists.
        const elementObj = wrapper.find(elementName);
        expect(elementObj).not.toBeNull();

        // Simulate working of element.
        const event = {
            target: { value: defaultValue }
        };
        
        elementObj.simulate('change', event);
        wrapper.update();

        // Check if element's value is changed.
        const modifiedElementObj = wrapper.find(elementName);
        expect(modifiedElementObj.prop('value')).toEqual(defaultValue);

        done();
    });
});

describe('Test for Modal "Forgot Password":', () => {
    let wrapper: any;

    /**
     * Initialize
     */
    wrapper = mount(<Component/>);

    const elementName = 'a#forgot-password';
    
    // Check if element exists.
    const elementObj = wrapper.find(elementName);

    // Simulate working of element.
    elementObj.simulate('click');
    wrapper.update();

    /** 
     *  Check if redering.
     */
    it('Check rendering', () => {
      expect(wrapper).not.toBeNull();
    });

    /** 
     *  Check if some elements exist.
     */
    getTestForContents(wrapper, forgotPasswordTestContents);

    /** 
     *  Check if some elements work correctly.
     */
    // Check input Email
    it('Should be able to enter email.', done => {
        const defaultValue = TEST_AUTH_INFO.signedAuth.username;
        
        const elementName = 'div.MuiDialog-root input#email';
        
        // Check if element exists.
        const elementObj = wrapper.find(elementName);
        expect(elementObj).not.toBeNull();

        // Simulate working of element.
        const event = {
            target: { value: defaultValue }
        };
        
        elementObj.simulate('change', event);
        wrapper.update();

        // Check if element's value is changed.
        const modifiedElementObj = wrapper.find(elementName);
        expect(modifiedElementObj.prop('value')).toEqual(defaultValue);

        done();
    });

    // Check if modal closes
    it('Modal should be able to close when close button is clicked.', done => {
        const elementName = 'div.MuiDialog-root button#close-button';

        // Check if element exists.
        const elementObj = wrapper.find(elementName);

        // Simulate working of element.
        elementObj.simulate('click');
        wrapper.update();

        // Check if element's value is changed.
        const modifiedElementObj = wrapper.find(elementName);
        expect(modifiedElementObj).toMatchObject({});

        done();
    });
});


describe('Test for Modal "Forgot Password" Submit:', () => {
    let wrapper: any;

    /**
     * Initialize
     */
    wrapper = mount(<Component/>);

    // Open Forgot Password Modal.
    let elementName = 'a#forgot-password';    
    let elementObj = wrapper.find(elementName);
    elementObj.simulate('click');
    wrapper.update();

    // Enter email and Click button "Send Code"
    const defaultValue = TEST_AUTH_INFO.signedAuth.password;        
    const event = {
        target: { value: defaultValue }
    };
    elementName = 'input#standard-adornment-password';
    elementObj = wrapper.find(elementName);
    elementObj.simulate('change', event);
    wrapper.update();

    elementName = 'button#send-code';    
    elementObj = wrapper.find(elementName);
    elementObj.simulate('click');
    wrapper.update();

    /** 
     *  Check if redering.
     */
    it('Check rendering', () => {
      expect(wrapper).not.toBeNull();
    });

    /** 
     *  Check if some elements exist.
     */
    getTestForContents(wrapper, forgotPasswordSubmitTestContents);
});