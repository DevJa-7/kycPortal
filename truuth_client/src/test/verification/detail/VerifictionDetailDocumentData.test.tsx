import React from 'react';
import { mount } from 'enzyme';
import { VerifictionDetailDocumentData } from 'shared_components/src/components/verification';

import { render } from '@testing-library/react';

let defaultProps = {
    editable: false,
    isEdit: false,
    handleChange: null,
    handleCancel: null,
    handleSave: null,
    handleEdit: null,
    data: [],
    faceImage: '',
};

describe('Test <VerifictionDetailDocumentData/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash..', () => {
            wrapper = mount(<VerifictionDetailDocumentData
                {...defaultProps} 
            />);
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'IDENTITY DOCUMENTS\' should be existed.', () => {
            expect(wrapper.text().includes('IDENTITY DOCUMENTS')).toBe(true);
        });
    });

    describe('Check if button shows based on the status:', () => {
        /**
         * Check if functionality is correctly working.
         */
        it('If document can be editable and Edit button from \'Verification List Page\' is clicked => \
            \'SAVE\' button should be showed.', () => {

            defaultProps.editable = true;
            defaultProps.isEdit = true;
            const {getByText} = render(<VerifictionDetailDocumentData
                {...defaultProps}
            />) as any;
            expect(getByText(/SAVE/i).closest('button')).toBeTruthy();
        });

        it('If document can be editable and Edit button \'Verification List Page\' is not clicked => \
            \'EDIT\' button should be showed.', () => {

            defaultProps.editable = true;
            defaultProps.isEdit = false;
            const {getByText} = render(<VerifictionDetailDocumentData
                {...defaultProps}
            />) as any;
            expect(getByText(/EDIT/i).closest('button')).toBeTruthy();
        });
    });
});
