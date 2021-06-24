import { 
    ITestContent, 
    TYPE_TEST_CONTENT 
} from './types';

export const getTestForContents = (wrapper: any, testContents: ITestContent[]) => {
    return testContents.map(content => {
        switch (content.type) {
            case TYPE_TEST_CONTENT.STRING:
                if (content?.text) {
                    return (
                        it(`${content.name} should exist.`, () => {
                            expect(wrapper.text().includes(content?.text)).not.toBeNull();
                        })
                    );
                }
                break;
            case TYPE_TEST_CONTENT.ELEMENT:
                if (content?.element) {
                    return (
                        it(`${content.name} should exist.`, () => {
                            expect(wrapper.find(content?.element)).not.toBeNull();
                        })
                    );
                }
                break;
            default:
                break;
        }
    });
}