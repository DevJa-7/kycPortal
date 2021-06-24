import React from 'react';
import { mount } from 'enzyme';
import { VerificationInviteModal } from 'shared_components/src/components/verification';

const defaultProps = {
    isMobile: false,
    sendInvite: null,
    generateInviteUrl: null,
    sendCopyToClipboard: null,
};

const inviteModalOpenBtn = '.makeStyles-inviteButton-7';

describe('Test <VerificationInviteModal/> :', () => {

    let wrapper = mount(<VerificationInviteModal
        {...defaultProps}
    />);

    describe('Check if UI component is existed', () => {
        /**
         * Check if component is rendering
         */
        it('Component should be rendered without crash.', () => {
            expect(wrapper.exists()).toBe(true);
        });

        it('String \'INVITE FOR KYC\' should be existed.', () => {
            expect(wrapper.text().includes('INVITE FOR KYC')).toBe(true);
        });
    });

    describe('Check the functionality', () => {
        it('String \'GENERATE LINK\' should be existed.', () => {
            wrapper = mount(<VerificationInviteModal
                {...defaultProps}
            />);
            // Check if element exists.
            const elementObj = wrapper.find(inviteModalOpenBtn).at(0);

            // Simulate clicking open invite modal
            elementObj.simulate('click');
            wrapper.update();

            // now it is not working. please think about that more.
            expect(wrapper.text().includes('GENERATE LINK')).toBe(true);
        });
    });
});

