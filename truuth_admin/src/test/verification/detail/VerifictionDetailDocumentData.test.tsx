import React from 'react';
import { mount } from 'enzyme';
import { VerifictionDetailDocumentData } from 'shared_components/src/components/verification';

import { render } from '@testing-library/react';
import { IIdentityDocument, IVerificationDetail, VERIFICATION_DOCUMENT_TYPES } from 'shared_components/src/service/models/verification';

const defaultProps = {
    editable: false,
    isEdit: false,
    handleChange: null,
    handleCancel: null,
    handleSave: null,
    handleEdit: null,
    data: [] as IVerificationDetail[],
    faceImage: '',
};

const testIdentityDocument = {
    personalNumber: 'N/A',
    firstName: 'N/A',
    lastName: 'N/A',
    dateOfBirth: 'N/A',
    dateOfExpiry: 'N/A',
    country: 'N/A',
    placeOfBirth: 'N/A',
    state: 'N/A',
    licenceClass: 'N/A',
    idNumber: 'N/A',
    MRZ1: 'N/A',
    MRZ2: 'N/A',
    cardNumber: 'N/A',
    dateOfIssue: 'N/A',
    gender: 'N/A',
    issueNumber: 'N/A',
    issuingAuthority: 'N/A',
    issuingCode: 'N/A',
    middleName: 'N/A',
    nationality: 'N/A',
    passportType: 'N/A',
    firstName2: 'N/A',
    lastName2: 'N/A',
    firstName3: 'N/A',
    lastName3: 'N/A',
    firstName4: 'N/A',
    lastName4: 'N/A',
    firstName5: 'N/A',
    lastName5: 'N/A',
} as IIdentityDocument;

const cardBtnClassName = '.makeStyles-icons-5';
const firsName = 'First Name *';
const lastName = 'Last Name *';
const dateOfBirth = 'Date of Birth *';
const licenceNumber = 'Licence Number *';
const dateOfExpiry = 'Date of Expiry *';
const licenceClass = 'Licence Class *';
const state = 'State *';
const gender = 'Gender *';
const passportNumber= 'Passport Number *';
const issuingAuthority = 'Issuing Authority *';
const nationality = 'Nationality *';

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

    describe('Check required field in the detail page.', () => {
        /**
         * check required field in the detail page.
         */
        it('For Drive License \'firstName\', \'lastName\', \'dateOfBirth\', ' +
            '\'idNumber\', \'licenceClass\' and \'state\' should be required.', () => {
            defaultProps.editable = true;
            defaultProps.isEdit = true;
            defaultProps.data = [
                {
                    _id:              '',
                    documentType:     VERIFICATION_DOCUMENT_TYPES.DRIVERS_LICENCES,
                    identityDocument: testIdentityDocument,
                    security:         null as any,
                    images:           null as any,
                    provider:         null as any,
                    outcome:          '',
                }
            ];

            wrapper = mount(<VerifictionDetailDocumentData
                {...defaultProps}
            />);

            // Check if element exists.
            const elementObj = wrapper.find(cardBtnClassName).at(0);

            // Simulate clicking Drive License card
            elementObj.simulate('click');
            wrapper.update();

            expect(wrapper.text().includes(firsName)).toBe(true);
            expect(wrapper.text().includes(lastName)).toBe(true);
            expect(wrapper.text().includes(dateOfBirth)).toBe(true);
            expect(wrapper.text().includes(licenceNumber)).toBe(true);
            expect(wrapper.text().includes(licenceClass)).toBe(true);
            expect(wrapper.text().includes(state)).toBe(true);
        });

        it('For Passport \'firstName\', \'lastName\', \'dateOfBirth\', \'gender\', ' +
            '\'idNumber\', \'dateOfExpiry\', \'issuingAuthority\' and \'nationality\' should be required.', () => {
            defaultProps.editable = true;
            defaultProps.isEdit = true;
            defaultProps.data = [
                {
                    _id:              '',
                    documentType:     VERIFICATION_DOCUMENT_TYPES.PASSPORT,
                    identityDocument: testIdentityDocument,
                    security:         null as any,
                    images:           null as any,
                    provider:         null as any,
                    outcome:          '',
                }
            ];

            wrapper = mount(<VerifictionDetailDocumentData
                {...defaultProps}
            />);

            // Check if element exists.
            const elementObj = wrapper.find(cardBtnClassName).at(0);

            // // Simulate clicking Passport Card
            elementObj.simulate('click');
            wrapper.update();

            expect(wrapper.text().includes(firsName)).toBe(true);
            expect(wrapper.text().includes(lastName)).toBe(true);
            expect(wrapper.text().includes(dateOfBirth)).toBe(true);
            expect(wrapper.text().includes(gender)).toBe(true);
            expect(wrapper.text().includes(passportNumber)).toBe(true);
            expect(wrapper.text().includes(dateOfExpiry)).toBe(true);
            expect(wrapper.text().includes(issuingAuthority)).toBe(true);
            expect(wrapper.text().includes(nationality)).toBe(true);
        });

        it('For Proof of Age Card \'firstName\', \'lastName\', \'dateOfBirth\', ' +
            '\'idNumber\', \'dateOfExpiry\', \'licenceClass\' and \'State\' should be required.', () => {
            defaultProps.editable = true;
            defaultProps.isEdit = true;
            defaultProps.data = [
                {
                    _id:              '',
                    documentType:     VERIFICATION_DOCUMENT_TYPES.PROOF_OF_AGE_CARD,
                    identityDocument: testIdentityDocument,
                    security:         null as any,
                    images:           null as any,
                    provider:         null as any,
                    outcome:          '',
                }
            ];

            wrapper = mount(<VerifictionDetailDocumentData
                {...defaultProps}
            />);

            // Check if element exists.
            const elementObj = wrapper.find(cardBtnClassName).at(0);

            // // Simulate clicking Proof of Age card
            elementObj.simulate('click');
            wrapper.update();

            expect(wrapper.text().includes(firsName)).toBe(true);
            expect(wrapper.text().includes(lastName)).toBe(true);
            expect(wrapper.text().includes(dateOfBirth)).toBe(true);
            expect(wrapper.text().includes(licenceNumber)).toBe(true);
            expect(wrapper.text().includes(dateOfExpiry)).toBe(true);
            expect(wrapper.text().includes(licenceClass)).toBe(true);
            expect(wrapper.text().includes(state)).toBe(true);
        });
    })
});
