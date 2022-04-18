module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "jsx-quotes": [2, "prefer-single"],
        "max-lines": ["error", { "max": 200, "skipBlankLines": true }],
        "no-alert": "error",
        "no-console": "warn",
        "no-debugger": "warn",
        "no-duplicate-imports": "off",
        "no-magic-numbers": ["error", { "ignore": [-1, 0, 1, 2, 100] }],
        "no-undef": "off",
        "prefer-arrow-callback": 0,
        "prefer-const": 0,
       " quotes": [0, "double"],
        "react/jsx-no-useless-fragment": "error",
        "react/no-array-index-key": 0,
        "react/react-in-jsx-scope": 0,
        "react/jsx-key": 0,
        "react/prop-types": 0,
        "no-unused-vars":0,
        "semi": [2, "always"]
    }
}