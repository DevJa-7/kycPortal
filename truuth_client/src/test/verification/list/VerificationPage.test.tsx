import React from 'react';
import { Provider } from 'react-redux'
import { shallow, configure, mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import VerificationPage from '../../../pages/verification/VerificationPage';
import store from '../../../store';

const Component = () => {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={['/random']}>
                <VerificationPage />
            </MemoryRouter>
        </Provider>
    );
};

describe('Test <VerificationPage/> :', () => {

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
        it('String \'KYC Verification\' should be existed.', () => {
            expect(wrapper.text().includes('KYC Verification')).toBe(true);
        });

    });
    
    describe('Check if sub components is existed', () => {
        /**
         * Check if sub components exist.
         */
        it('Sub component <VerificationTable/> should be existed.', () => {
            expect(wrapper.find('VerificationTable').exists()).toBe(true);
        });

        /**
         * Check if sub components exist.
         */
        it('Sub component <AutorenewIcon/> should be existed.', () => {
            expect(wrapper.find('.MuiButton-startIcon').length).toBe(1);
        });
    });
});
