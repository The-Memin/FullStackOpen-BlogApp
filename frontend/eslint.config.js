// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestGlobals from 'eslint-plugin-vitest-globals'

export default [
    {
        ignores: ['dist', '.eslintrc.cjs', 'node_modules', 'vite.config.js'],
    },

    // Config base de ESLint
    js.configs.recommended,

    // Config para React y JSX
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.browser, ...globals.node, ...vitestGlobals.environments.env.globals },
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // Equivalente a "plugin:react/recommended"
            ...react.configs.recommended.rules,
            // Equivalente a "plugin:react/jsx-runtime"
            ...react.configs['jsx-runtime'].rules,
            // Equivalente a "plugin:react-hooks/recommended"
            ...reactHooks.configs['recommended-latest'].rules,
            // equivalente a "extends: plugin:vitest-globals/recommended"
            ...vitestGlobals.configs.recommended.rules,
            // Tus reglas personalizadas
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'never'],
            eqeqeq: 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'no-console': 0,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 0,
            'no-unused-vars': 0,
        },
        settings: {
            react: { version: '18.2' },
        },
    },
]
