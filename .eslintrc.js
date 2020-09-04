module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  "env": { "es6": true, "browser": true, } ,
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
    "unicorn",
  ],
  extends: [
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
  ],
  rules: {
    semi: ["error", 'never'],
    quotes: ["error", 'single'],
    "no-console": "off",
    "indent": ["error", 2],
    '@typescript-eslint/no-unused-expressions': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': 'off'
  }
};
