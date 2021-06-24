import KycApiService from '../../service/kycApi.service';
global.fetch = jest.fn().mockImplementationOnce(()=>{
    return new Promise((resolve)=>{
        resolve({
            json:()=>{
                return {"deepLinkUrl":"https://mock"}
            }
        })
    })
});

describe('Test for apis of aVerification Page :', () => {
    // Test for getting deeplink
    test(`Should get subscription list`, async () => {
        return KycApiService.getDeepLink('233', 'test')
            .then(res => {
                expect(res.deepLinkUrl).toBeTruthy();
            });
    }, 7000);

});