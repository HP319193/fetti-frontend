module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        ".(css|less|scss)$": "identity-obj-proxy",
    },
    "modulePaths": ["<rootDir>"]
};
