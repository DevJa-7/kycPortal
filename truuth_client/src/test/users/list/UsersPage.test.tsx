import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import UsersPage from '../../../pages/users/UsersPage';
import store from '../../../store';

const Component = () => {
    return (
        <Provider store={store}>
            <UsersPage />
        </Provider>
    );
};

describe('Test <UsersPage/> :', () => {

    const wrapper = mount(<Component/>);

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

    });

    describe('Check if sub components is existed', () => {
        /**
         * Check if sub components exist.
         */
        it('Sub component <UserTable/> should be existed.', () => {
            expect(wrapper.find('UserTable').exists()).toBe(true);
        });
    });
});
