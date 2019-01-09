module.exports = {
  preset: 'ts-jest',
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
  "snapshotSerializers": [
    "jest-serializer-vue"
  ]
};