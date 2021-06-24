import React from 'react';
import { mount } from 'enzyme';
import { AUTH_ROLE } from 'shared_components/src/common/constants';
import { VerificationTableDetailButton } from 'shared_components/src/components/verification';
import { VERIFICATION_STATUS, IVerificationResult } from 'shared_components/src/service/models/verification';

let defaultProps = {
    className: '',
    id: '',
    detailId: '',
    role: AUTH_ROLE.none,
    state: VERIFICATION_STATUS.NEW,
    verificationResult: {} as IVerificationResult,
    subscriptionId: '',
    handleResendInvite: null,
    handleView: null,
    handleEdit: null,
    handleDelete: null,
};

describe('Test <VerificationTableDetailButton/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps} 
            />);
            // console.log('wrapper =', wrapper.debug());
            expect(wrapper.exists()).toBe(true);
        });
    });

    describe('Check each record based on the status:', () => {
        /**
         * Check if functionality is correctly working.
         */
        it('If user is admin and verification state is DONE \
            \'View Details\' Menu should be showed.', () => {
            /**
             * In the case that user is admin and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.admin;
            defaultProps.state = VERIFICATION_STATUS.DONE;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('View Details')).toBe(true);
        });

        it('If user is admin and verification state is PROCESSING, \
            \'View Details\' Menu should be showed.', () => {
            /**
             * In the case that user is admin and verification state is PROCESSING
             */
            defaultProps.role = AUTH_ROLE.admin;
            defaultProps.state = VERIFICATION_STATUS.PROCESSING;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('View Details')).toBe(true);
        });

        it('If user is client and verification state is DONE, \
            \'View Details\' Menu should be showed.', () => {
            /**
             * In the case that user is client and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.client;
            defaultProps.state = VERIFICATION_STATUS.DONE;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('View Details')).toBe(true);
        });

        it('If user is agent and verification state is DONE, \
            \'View Details\' Menu should be showed.', () => {
            /**
             * In the case that user is agent and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.agent;
            defaultProps.state = VERIFICATION_STATUS.DONE;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('View Details')).toBe(true);
        });

        it('If user is agent and verification state is DONE, \
            \'View Details\' Menu should be showed.', () => {
            /**
             * In the case that user is agent and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.agent;
            defaultProps.state = VERIFICATION_STATUS.DONE;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('View Details')).toBe(true);
        });

        it('If user is not admin and verification state is NEW, \
            \'Resend Invite\' Menu should be showed.', () => {
            /**
             * In the case that user is agent and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.client;
            defaultProps.state = VERIFICATION_STATUS.NEW;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('Resend Invite')).toBe(true);
        });

        it('If user is not admin and verification state is IN_PROGRESS, \
            \'Resend Invite\' Menu should be showed.', () => {
            /**
             * In the case that user is agent and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.client;
            defaultProps.state = VERIFICATION_STATUS.IN_PROGRESS;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('Resend Invite')).toBe(true);
        });

        it('If user is not admin and verification state is IN_PROGRESS, \
            \'Resend Invite\' Menu should be showed.', () => {
            /**
             * In the case that user is agent and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.client;
            defaultProps.state = VERIFICATION_STATUS.IN_PROGRESS;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('Resend Invite')).toBe(true);
        });

        it('If user is admin and verification state is PROCESSING, and verificationResult is existed \
            \'Edit\' Menu should be showed.', () => {
            /**
             * In the case that user is agent and verification state is DONE
             */
            defaultProps.role = AUTH_ROLE.admin;
            defaultProps.state = VERIFICATION_STATUS.PROCESSING;
            defaultProps.verificationResult.requiresManualVerification = true;
            wrapper = mount(<VerificationTableDetailButton
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('Edit')).toBe(true);
        });
    });
});
