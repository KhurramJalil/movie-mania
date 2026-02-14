const {
    defineConfig,
} = require("eslint/config");

const globals = require("globals");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",

            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    extends: fixupConfigRules(
        compat.extends("plugin:react/recommended", "airbnb", "plugin:import/typescript"),
    ),

    plugins: {
        react: fixupPluginRules(react),
    },

    rules: {
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "no-console": 0,
        "import/extensions": 0,
        "react/prop-types": 0,
        "linebreak-style": 0,
        "react/state-in-constructor": 0,
        "import/prefer-default-export": 0,
        "max-len": [2, 250],

        "no-multiple-empty-lines": ["error", {
            max: 1,
            maxEOF: 1,
        }],

        "no-underscore-dangle": ["error", {
            allow: ["_d", "_dh", "_h", "_id", "_m", "_n", "_t", "_text"],
        }],

        "object-curly-newline": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-one-expression-per-line": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/alt-text": 0,
        "jsx-a11y/no-autofocus": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/no-array-index-key": 0,
        "no-param-reassign": 0,
        "react/react-in-jsx-scope": 0,

        "jsx-a11y/anchor-is-valid": ["error", {
            components: ["Link"],
            specialLink: ["to", "hrefLeft", "hrefRight"],
            aspects: ["noHref", "invalidHref", "preferButton"],
        }],
    },
}]);
