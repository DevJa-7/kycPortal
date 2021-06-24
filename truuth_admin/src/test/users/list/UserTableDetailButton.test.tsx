import React from 'react';
import { mount } from 'enzyme';
import UserTableDetailButton from '../../../pages/users/UserTableDetailButton';

const defaultProps = {
    className: '',
    id: '',
    detailId: '',
    subscriptionId: '',
};

describe('Test <UserTableDetailButton/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            wrapper = mount(<UserTableDetailButton
                {...defaultProps}
            />);
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'View Details\', \'Edit\' Column in non-mobile version should be existed.', () => {
            wrapper = mount(<UserTableDetailButton
                {...defaultProps}
            />);

            expect(wrapper.text().includes('View Details')).toBe(true);
            expect(wrapper.text().includes('Edit')).toBe(true);
        });
    });

});
