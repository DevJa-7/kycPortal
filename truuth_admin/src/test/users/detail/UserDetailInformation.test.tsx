import React from 'react';
import { mount } from 'enzyme';
import UserDetailInformation from 'shared_components/src/components/users/UserDetailInformation';

const defaultProps = {
    data: undefined,
    edit: false,
    handleChange: null,
    handleChangeStatus: null,
};

describe('Test <UserDetailInformation/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        wrapper = mount(<UserDetailInformation
            {...defaultProps}
        />);

        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'Status\' should be existed.', () => {
            expect(wrapper.text().includes('Status')).toBe(true);
        });
    });

    describe('Check if functionality is based on editable', () => {
        defaultProps.edit = true;
        wrapper = mount(<UserDetailInformation
            {...defaultProps}
        />);

        /**
         * Check if some elements exists
         */
        it('String \'Enabled\' should be existed.', () => {
            expect(wrapper.text().includes('Enabled')).toBe(true);
        });
    });
});
