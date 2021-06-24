import React from 'react';
import { mount } from 'enzyme';
import { VerificationDetailInformation } from 'shared_components/src/components/verification';
import { AUTH_ROLE } from 'shared_components/src/common/constants';
import {
    VERIFICATION_RESULT_VALUE,
    VERIFICATION_STATUS,
} from 'shared_components/src/service/models/verification';
import { render } from '@testing-library/react';

let defaultProps = {
    data: undefined,
    role: AUTH_ROLE.none,
    editable: false,
    isEdit: false,
    handleChange: null,
    handleSave: null,
    handleCancel: null,
    handleEdit: null,
    handleEditCancel: null,
    handleReopenVerification: null,
    handleVerification: null,
};

describe('Test <VerificationDetailInformation/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            wrapper = mount(<VerificationDetailInformation
                {...defaultProps}
            />);
            // console.log('wrapper ==', wrapper.debug());
            expect(wrapper.exists()).toBe(true);
        });
    });

    describe('Check if button shows based on the status:', () => {
        /**
         * Check if functionality is correctly working.
         */
        it('If editable true, \'COMPLETE VERIFICATION\' button should be showed.', () => {
            defaultProps.editable = true;
            wrapper = mount(<VerificationDetailInformation
                {...defaultProps}
            />);
            expect(wrapper.text().includes('COMPLETE VERIFICATION')).toBe(true);
        });

        it('If editable false and user is admin, \'RE-OPEN VERIFICATION\' button should be showed.', () => {
            defaultProps.editable = false;
            defaultProps.role = AUTH_ROLE.admin;
            wrapper = mount(<VerificationDetailInformation
                {...defaultProps}
            />);
            expect(wrapper.text().includes('RE-OPEN VERIFICATION')).toBe(true);
        });

        it('If verification status = PROCESSING and verification result = AWAITING_VERIFICATION => \
            \'COMPLETE VERIFICATION\' button should be disabled.', () => {

            defaultProps.editable = true;
            defaultProps.data = {
                verificationStatus: VERIFICATION_STATUS.PROCESSING,
                verificationResult: VERIFICATION_RESULT_VALUE.AWAITING_VERIFICATION
            } as any;

            const {getByText} = render(<VerificationDetailInformation
                {...defaultProps}
            />) as any;
            expect(getByText(/COMPLETE VERIFICATION/i).closest('button').disabled).toBeTruthy();
        });

        it('If verification result = APPROVED_VERIFIED => APPROVED should be showed.', () => {

            defaultProps.editable = false;
            defaultProps.data = {
                verificationResult: VERIFICATION_RESULT_VALUE.APPROVED_VERIFIED
            } as any;

            wrapper = mount(<VerificationDetailInformation
                {...defaultProps}
            />);

            expect(wrapper.text().includes('APPROVED')).toBe(true);
        });

    });
});
