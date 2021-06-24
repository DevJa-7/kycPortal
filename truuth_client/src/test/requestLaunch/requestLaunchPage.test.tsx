import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { RequestLaunch } from '../../pages/request-launch';
import {
    qrPageContent
} from '../mocks/requestLaunch/requestLaunch';
import store from '../../store';
import { getTestForContents } from '../common/utils';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
      pathname: '/launch',
      search: 'verification=21323&tenantName=afg',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
}));

const Component = () => {
    return (
        <Provider store={store}>
            <RequestLaunch />
        </Provider>
    );
};

describe('Test for login page :', () => {
    let  wrapper = mount(<Component />);
    /**
     *  Check if redering.
     */
    it('Check rendering', () => {
        expect(wrapper).not.toBeNull();
    });

    /**
     *  Check if some elements exist.
     */
    getTestForContents(wrapper, qrPageContent);

    /**
     *  Check if some elements work correctly.
     */
    // Check input QRCode
    it('Should be able to see QR Code.', done => {
        const elementName = '.qrCode';
        const elementObj = wrapper.find(elementName);
        expect(elementObj).not.toBeNull();
        done();
    });

    it('assign value',done=>{
        wrapper.setState({"verificationID":"3222"});
        wrapper.setState({"tenantName":"Australian Fianance Group"});
        expect(wrapper.text().includes("Australian Fianance Group has sent a request for you to verify your identity but it looks like you’re not on your phone.")).not.toBeNull();
    })

});
