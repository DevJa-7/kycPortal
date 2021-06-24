import React from 'react';
import { mount } from 'enzyme';
import VerificationSecurityCheck from 'shared_components/src/components/verification/VerificationSecurityCheck';
import {
    DOB_MATCH_CHECK,
    DOCUMENT_AUTHENTICITY_CHECK,
    DVS_CHECK,
    EXPIRY_CHECK,
    FACE_MATCH_CHECK,
    IRN_CHECK
} from 'shared_components/src/service/models/verification';
import { AUTH_ROLE } from 'shared_components/src/common/constants';

let defaultProps = {
    editable: false,
    role: AUTH_ROLE.none,
    security: undefined,
    onChange: null,
};

describe('Test <VerificationSecurityCheck/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            wrapper = mount(<VerificationSecurityCheck
                {...defaultProps} 
            />);
            expect(wrapper.exists()).toBe(true);
        });
    });

    describe('Check if functionality is working:', () => {
        /**
         * Check if functionality is correctly working.
         */
        it('If security is existed, String \'SECURITY CHECKS\' should be showed.', () => {
            defaultProps.security = {} as any;
            wrapper = mount(<VerificationSecurityCheck
                {...defaultProps}
            />);
            expect(wrapper.text().includes('SECURITY CHECKS')).toBe(true);
        });
    });

    describe('Check if functionality of irn match is working:', () => {
        /**
         * Check if functionality of irn is correctly working.
         */
        it('If role is client and irn is matched, IRN check should not be showed.', () => {
            defaultProps.security = {
                documentAuthenticity: DOCUMENT_AUTHENTICITY_CHECK.na,
                faceMatch: FACE_MATCH_CHECK.failed,
                expired: EXPIRY_CHECK.na,
                nameMatch: FACE_MATCH_CHECK.na,
                dobMatch: DOB_MATCH_CHECK.na,
                dvsCheck: DVS_CHECK.failed,
                irnMatch: IRN_CHECK.ok,
            } as any;
            defaultProps.role = AUTH_ROLE.client;

            wrapper = mount(<VerificationSecurityCheck
                {...defaultProps}
            />);
            expect(wrapper.text().includes('IRN Check')).toBe(false);
        });
    });
});
