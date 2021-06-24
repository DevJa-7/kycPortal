import React from 'react';
import { mount } from 'enzyme';
import { UsersTable } from '../../../pages/users/index';
import { IUsersDocument } from 'shared_components/src/service/models/user';

const defaultProps = {
    className: '',
    data: [] as IUsersDocument[],
    subscriptionId: '',
};

describe('Test <UsersTable/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            wrapper = mount(<UsersTable
                {...defaultProps}
            />);
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'First Name\', \'Last  Name\', \'Email\', \'Type\',' +
            '\'Status\', \'Organisation\', \'Action\' ' +
            'Column in non-mobile version should be existed.', () => {
            wrapper = mount(<UsersTable
                {...defaultProps}
            />);

            expect(wrapper.text().includes('First Name')).toBe(true);
            expect(wrapper.text().includes('Last  Name')).toBe(true);
            expect(wrapper.text().includes('Email')).toBe(true);
            expect(wrapper.text().includes('Type')).toBe(true);
            expect(wrapper.text().includes('Status')).toBe(true);
            expect(wrapper.text().includes('Organisation')).toBe(true);
            expect(wrapper.text().includes('Action')).toBe(true);
        });
    });
});
