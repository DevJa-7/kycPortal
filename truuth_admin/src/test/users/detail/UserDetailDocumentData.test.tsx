import React from 'react';
import { mount } from 'enzyme';
import UserDetailDocumentData from 'shared_components/src/components/users/detailDocumentData/index';
import { IUsersDocument } from 'shared_components/src/service/models/user';

const defaultProps = {
    editable: false,
    handleChange: null,
    data: null as unknown as IUsersDocument,
    validationErrors: {
        firstName: ''
    },
};

describe('Test <UserDetailDocumentData/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        wrapper = mount(<UserDetailDocumentData
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
        it('String \'First Name\' should be existed.', () => {
            expect(wrapper.text().includes('First Name')).toBe(true);
        });
        it('String \'Last Name\' should be existed.', () => {
            expect(wrapper.text().includes('Last Name')).toBe(true);
        });
        it('String \'Mobile\' should be existed.', () => {
            expect(wrapper.text().includes('Mobile')).toBe(true);
        });
        it('String \'Type\' should be existed.', () => {
            expect(wrapper.text().includes('Type')).toBe(true);
        });
    });

});
