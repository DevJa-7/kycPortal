import React from 'react';
import { Provider } from 'react-redux'
import { shallow, configure, mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import VerificationDetailPage from '../../../pages/verification/VerificationDetailPage';
import store from '../../../store';

const Component = () => {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={['/random']}>
                <VerificationDetailPage />
            </MemoryRouter>
        </Provider>
    );
};

describe('Test <VerificationDetailPage/> :', () => {

    let wrapper: any;

    beforeEach(() => {
        wrapper = mount(<Component/>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            // console.log('wrapper ==', wrapper.debug());
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'KYC Verification Details\' should be existed.', () => {
            expect(wrapper.text().includes('KYC Verification Details')).toBe(true);
        });

        it('String \'CUSTOMER DATA\' should be existed.', () => {
            expect(wrapper.text().includes('CUSTOMER DATA')).toBe(true);
        });

        it('String \'IDENTITY DOCUMENTS\' should be existed.', () => {
            expect(wrapper.text().includes('IDENTITY DOCUMENTS')).toBe(true);
        });
    });
    
    describe('Check if sub components is existed', () => {
        /**
         * Check if sub components exist.
         */
        it('Sub component <VerificationDetailInformation/> should be existed.', () => {
            expect(wrapper.find('VerificationDetailInformation').exists()).toBe(true);
        });

        it('Sub component <VerifictionDetailCustomerData/> should be existed.', () => {
            expect(wrapper.find('VerifictionDetailCustomerData').exists()).toBe(true);
        });

        it('Sub component <VerifictionDetailDocumentData/> should be existed.', () => {
            expect(wrapper.find('VerifictionDetailDocumentData').exists()).toBe(true);
        });
    });
});
