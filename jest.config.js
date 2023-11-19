module.export = {
    projects: [
        "<rootDir>/katsa/*/jest.config.js"
    ],
    testEnvironment: "node",
    transform: {
        "^.*\\.js$": "babel-jest",
        "^.+\\.ts$": "ts-jest",
    },
}