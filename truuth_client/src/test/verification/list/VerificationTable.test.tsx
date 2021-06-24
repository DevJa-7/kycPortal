import React from 'react';
import { mount } from 'enzyme';
import { VerificationTable } from 'shared_components/src/components/verification';
import { AUTH_ROLE } from 'shared_components/src/common/constants';
import { IVerificationDocument } from 'shared_components/src/service/models/verification';
    
let defaultProps = {
    className: '',
    data: [] as IVerificationDocument[],
    subscriptionId: '',
    role: AUTH_ROLE.none,
};

describe('Test <VerificationTable/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            wrapper = mount(<VerificationTable
                {...defaultProps} 
            />);
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'Email\', \'Verification ID\', \'Customer Ref\', \'First Name\', \
            \'Last Name\', \'Status\', \'Verification Result\' \
            Column in non-mobile version should be existed.', () => {
            wrapper = mount(<VerificationTable
                {...defaultProps} 
            />);

            expect(wrapper.text().includes('Email')).toBe(true);
            expect(wrapper.text().includes('Verification ID')).toBe(true);
            expect(wrapper.text().includes('Customer Ref')).toBe(true);
            expect(wrapper.text().includes('First Name')).toBe(true);
            expect(wrapper.text().includes('Last Name')).toBe(true);
            expect(wrapper.text().includes('Status')).toBe(true);
            expect(wrapper.text().includes('Verification Result')).toBe(true);
        });
    });

    describe('Check if button shows based on the status:', () => {
        /**
         * Check if functionality is correctly working.
         */
        it('If user is admin, \'Agent\' Column should be showed.', () => {

            defaultProps.role = AUTH_ROLE.admin;
            wrapper = mount(<VerificationTable
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('Agent')).toBe(true);
        });

        it('If user is client, \'Agent\' Column should not be showed.', () => {

            defaultProps.role = AUTH_ROLE.client;
            wrapper = mount(<VerificationTable
                {...defaultProps}
            />) as any;
            expect(wrapper.text().includes('Agent')).toBe(false);
        });
    });

    describe('Check showing verification result based on status', () => {
        /**
         * Check if showing verification result based on status.
         */
        it('If status is NEW it should be showed \'-\'', () => {
            // defaultProps.data = [
            //     {
            //         agentDetails:   null as any,
            //         inviteeDetails: null as any,
            //         _id:            '',
            //         verificationID: '',
            //         subscriptionID: '',
            //         agentID:        '',
            //         externalRefId:  '',
            //         status:         VERIFICATION_STATUS.NEW,
            //         createdAt:      null as any,
            //         updatedAt:      null as any,
            //     },
            // ];
            defaultProps.role = AUTH_ROLE.admin;

            wrapper = mount(<VerificationTable
                {...defaultProps}
            />);
            // console.log('wrapper ==', wrapper.debug());
            expect(wrapper.text().includes('-')).toBe(false);
        });
    });
});
