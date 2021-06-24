import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import UserDetailPage from '../../../pages/users/UserDetailPage';
import store from '../../../store';

const Component = () => {
    return (
        <Provider store={store}>
            <UserDetailPage />
        </Provider>
    );
};

describe('Test <UserDetailPage/> :', () => {

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
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'View Users\' should be existed.', () => {
            expect(wrapper.text().includes('View Users')).toBe(true);
        });

        it('String \'USER DATA\' should be existed.', () => {
            expect(wrapper.text().includes('USER DATA')).toBe(true);
        });
    });

    describe('Check if sub components is existed', () => {
        /**
         * Check if sub components exist.
         */
        it('Sub component <UserDetailInformation/> should be existed.', () => {
            expect(wrapper.find('UserDetailInformation').exists()).toBe(true);
        });

        it('Sub component <UserDetailDocumentData/> should be existed.', () => {
            expect(wrapper.find('UserDetailDocumentData').exists()).toBe(true);
        });

    });
});
