/**
 * Types to test content
 */
export enum TYPE_TEST_CONTENT {
    STRING = 0,
    ELEMENT = 1,
};

/**
 * Interface for test content
 */
export interface ITestContent {
    // Name of test to display
    name: string,
    // Text of redering to test
    text?: string,
    // Name of Element to find in order to test
    element?: string,
    // Type of test
    type: TYPE_TEST_CONTENT,
};
