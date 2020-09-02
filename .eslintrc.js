module.exports = {
    plugins: [
        "@typescript-eslint",
        "eslint-comments",
        "jest",
        "promise",
        "unicorn",
    ],
    extends: [
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:jest/recommended",
        "plugin:promise/recommended",
        "plugin:unicorn/recommended",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
    ],
    env: {
        node: true,
        browser: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    rules: {
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        "no-prototype-builtins": "off",
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        "import/prefer-default-export": "off",
        "import/no-default-export": "error",
        // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        "react/destructuring-assignment": "off",
        // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
        "react/jsx-filename-extension": "off",
        // Use function hoisting to improve code readability
        "no-use-before-define": [
            "error",
            { functions: false, classes: true, variables: true },
        ],
        "@typescript-eslint/no-use-before-define": [
            "error",
            { functions: false, classes: true, variables: true, typedefs: true },
        ],
        // Common abbreviations are known and readable
        "unicorn/prevent-abbreviations": "off",
        "react/prop-types": "off",
        "no-param-reassign": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
    },
}
