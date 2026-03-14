import tsParser from '@typescript-eslint/parser';

export default [
    {
        rules: {
            semi: 'off',
            'prefer-const': 'error',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },
];
