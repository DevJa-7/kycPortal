import React from 'react';
import { mount } from 'enzyme';
import { VerifictionDetailCustomerData } from 'shared_components/src/components/verification';
import { 
    IVerificationDetail, 
    VERIFICATION_DOCUMENT_TYPES,
    VERIFICATION_PROVIDER,
    IIdentityDocument,
    IVerificationDetailSecurity,
    IVerificationDetailImages } from 'shared_components/src/service/models/verification';

let defaultProps = {
    data: {
        _id: undefined,
        documentType: VERIFICATION_DOCUMENT_TYPES.DRIVERS_LICENCES,
        identityDocument: {} as IIdentityDocument,
        security: {} as IVerificationDetailSecurity,
        images: {} as IVerificationDetailImages,
        provider: undefined as unknown as VERIFICATION_PROVIDER,
        outcome: undefined,
    } as unknown as IVerificationDetail,
};

describe('Test <VerifictionDetailCustomerData/> :', () => {

    let wrapper: any;

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            wrapper = mount(<VerifictionDetailCustomerData
                {...defaultProps} 
            />);
            expect(wrapper.exists()).toBe(true);
        });

        /**
         * Check if some elements exists
         */
        it('String \'CUSTOMER DATA\' should be existed.', () => {
            expect(wrapper.text().includes('CUSTOMER DATA')).toBe(true);
        });
    });
});
