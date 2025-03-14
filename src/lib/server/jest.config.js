module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 30000, 
    collectCoverage: true,
    coverageDirectory: 'coverage', 
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"], 
};
