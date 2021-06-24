import { TEST_AUTH_ERROR_INFO, TEST_AUTH_INFO } from '../common/constants';
import AuthService from '../../service/auth.service';
import KycApiService from '../../service/kycApi.service';
import { 
    IVerificationDocument,
    IVerificationList,
    IVERIFICATION_DETAIL_EDIT_STATES,
} from 'shared_components/src/service/models/verification';
import { VERIFICATION_TABLE_PAGE_NUMBER } from 'shared_components/src/common/constants';
import { _MOCK_SUBSCRIPTION_ID } from '../mocks/verification/verification';

describe('Test for apis of aVerification Page :', () => {

    beforeAll(async () => {
        AuthService.init();
    });

    // Sign in before testing APIs
    const signedAuthInfo = {
        username: TEST_AUTH_INFO['signedAuth'].name,
        password: TEST_AUTH_INFO['signedAuth'].pass,
    };
    test(`Should sign in`, async () => {
        return AuthService.signIn(signedAuthInfo)
            .then(res => {
                if (!res?.challengeName) {
                    expect(res.signInUserSession?.idToken?.jwtToken).toBeTruthy();
                    const authToken = res.signInUserSession?.idToken?.jwtToken;
                    KycApiService.init(authToken);
                }
            });
    }, 7000);

    // Test for getting subscription list
    let subscriptionList: IVerificationList = {} as IVerificationList;
    test(`Should get subscription list`, async () => {
        return KycApiService.getSubscriptions()
            .then(res => {
                expect(res.docs).toBeTruthy();
                subscriptionList = res.docs;
            });
    }, 7000);

    // Test for getting verification list
    test('Should get verification list', async () => {
        const subscriptionId = _MOCK_SUBSCRIPTION_ID;
        const columnSort = 'updatedAt';
        const pageToken = 1;
        const filters = {};

        return KycApiService.getVerificationList(
            subscriptionId,
            pageToken,
            VERIFICATION_TABLE_PAGE_NUMBER,
            columnSort,
            filters,
        )
            .then((res: IVerificationList) => {
                expect(res).toBeTruthy();
                expect(res.docs).toBeTruthy();
            });
    });

    // Sign out after checking all apis.
    afterAll(async () => {
        await AuthService.signOut();
    });
});