import { 
    STATEITEM_STATES,
    IVerificationSecurityResponse
} from "../../common/constants";

import {
    DOCUMENT_AUTHENTICITY_CHECK,
    FACE_MATCH_CHECK,
    EXPIRY_CHECK,
    NAME_MATCH_CHECK,
    DOB_MATCH_CHECK,
    EPASSPORT_CHIP_CHECK,
    DVS_CHECK,
    IRN_CHECK
} from '../../service/models/verification';

function createVerificationData(
    serialNumber: number, 
    email: string, 
    customerRef: string, 
    firstName: string, 
    lastName: string, 
    modifiedAt: string,
    status: string,
    verificationStatus: string,
) {
    return { serialNumber, email, customerRef, firstName, lastName, modifiedAt, status, verificationStatus };
}

const verificationDetail = {
    firstName: 'Shyanne',
    lastName: 'Mosciski',
    email: 'Shyanne.Mosciski28@yahoo.com',
    type: 'Customer Ref-',
    dateOfBirth: 'DD/MM/YYYY',
    verificationStatus: 'Rejected - Declined T&C',
    reasonForRejection: 'Decline terms and conditions in mobile app',
    livenessCheck: STATEITEM_STATES.success,
    addressLine1: 'Unit 10/20/1980',
    postCode: '3150',
    city: 'Glen Waverley',
    subdivision: '-',
    country: 'Australia',
}

const verificationDocumentData = {
    driversLicence: {
        firstName: 'Shyanne',
        lastName: 'Mosciski',
        email: 'Shyanne.Mosciski28@yahoo.com',
        type: 'Customer Ref-',
        dateOfBirth: 'DD/MM/YYYY',
        verificationStatus: 'Rejected - Declined T&C',
        reasonForRejection: 'Decline terms and conditions in mobile app',
        livenessCheck: STATEITEM_STATES.success,
        addressLine1: 'Unit 10/20/1980',
        postCode: '3150',
        city: 'Glen Waverley',
        subdivision: '-',
        country: 'Australia',
    },
    passport: {
        number: 'N18373687',
        optionalData1: 'Optional Data 1',
        issuingData: 'Issuing Data',
        expiryDate: 'Expiry Date',
        state: 'State',
        issuingCoungty: 'Issuing Country',
        issuingPlace: 'Issuing Place',
    },
    medicareCard: {

    },
    proofOfAgeCard: {

    },
}

const verificationSecurityChecks: IVerificationSecurityResponse = {
    documentAuthenticity: DOCUMENT_AUTHENTICITY_CHECK.ok,
    faceMatch: FACE_MATCH_CHECK.failed,
    expired: EXPIRY_CHECK.expired,
    nameMatch: NAME_MATCH_CHECK.na,
    dobMatch: DOB_MATCH_CHECK.ok,
    ePassportChip: EPASSPORT_CHIP_CHECK.ok,
    dvsCheck: DVS_CHECK.ok,
    irnMatch: IRN_CHECK.failed,
}

export {
    verificationDetail,
    verificationDocumentData,
    verificationSecurityChecks,
};