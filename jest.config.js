module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest"
  },
  moduleNameMapper: {
    '^@/(.*)$': "<rootDir>/src/$1"
  },
  // serializer for snapshots
  snapshotSerializers: [
    "jest-serializer-vue"
  ],
  testMatch: [
    "<rootDir>tests/unit/**"
  ],
  transformIgnorePatterns: [
    "node_modules"
  ],
  reporters: [
      "default",
      "jest-junit"
  ]
};
