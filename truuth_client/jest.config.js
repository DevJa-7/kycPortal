module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>"],

    // Base path
    testURL: 'http://localhost/kyc',
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  
    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect"
    ],

    setupFiles: [
      "<rootDir>/src/test/setup/test-shim.js",
      "<rootDir>/src/test/setup/test-setup.js"
    ],

    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/test/setup/fileMock.js",
      "\\.(css|less)$": "<rootDir>/src/test/setup/styleMock.js"
    },
    
    // Test spec file resolution pattern
    // Matches parent folder `tests` and filename
    // should contain `test` or `spec`.
    testRegex: "(../test/*.|(test|spec))\\.(jsx?|tsx?)$",

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svg"],
    moduleDirectories: ["node_modules", "<rootDir>/../shared_components"],

    transformIgnorePatterns: [
      "<rootDir>/node_modules/(?!shared_components)"
    ],

    preset: "ts-jest/presets/js-with-ts",
};