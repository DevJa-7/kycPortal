import {
    ITestContent,
    TYPE_TEST_CONTENT
} from '../../common/types';

export const notMatchTestContents: ITestContent[] = [
    { name: 'String \"Page Not Found!\"', text: 'Page Not Found!', type: TYPE_TEST_CONTENT.STRING },
    {
        name: 'String \"Oops! It looks like the page you are looking for is not here\"',
        text: 'Oops! It looks like the page you are looking for is not here', type: TYPE_TEST_CONTENT.STRING
    },
];
