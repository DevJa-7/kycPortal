import { TEST_AUTH_ERROR_INFO, TEST_AUTH_INFO } from '../common/constants';
import AuthService from '../../service/auth.service';

describe('Test for Sign in :', () => {

    beforeAll(async () => {
        AuthService.init();
    });

    // Test for unsigned auth
    const unsignedAuthInfo = {
        username: TEST_AUTH_INFO['unsignedAuth'].name,
        password: TEST_AUTH_INFO['unsignedAuth'].pass,
    };
    it(`Shouldn't sign in with unsigned authentication`, async () => {
        return AuthService.signIn(unsignedAuthInfo)
            .then(res => {
                expect(TEST_AUTH_ERROR_INFO).toContain(res.code);
            });
    }, 7000);

    // Test for signed auth
    const signedAuthInfo = {
        username: TEST_AUTH_INFO['signedAuth'].name,
        password: TEST_AUTH_INFO['signedAuth'].pass,
    };
    it(`Should sign in with signed authentication`, async () => {
        return AuthService.signIn(signedAuthInfo)
            .then(res => {
                if (res?.challengeName) {
                    expect(res?.challengeName).toBeTruthy();
                } else {
                    expect(res?.signInUserSession?.idToken?.jwtToken).toBeTruthy();
                }
            });
    }, 7000);

    // Test for forgot password
    it(`Should forget password with signed authentication`, async () => {
        return AuthService.forgotPassword(signedAuthInfo.username)
            .then((res: any) => {
                expect(TEST_AUTH_ERROR_INFO).toContain(res?.code);
            })
            .catch(err => {
                expect(err).toBeTruthy();                
            });
    });

    // 
    afterAll(async () => {
        await AuthService.signOut();
    });
});