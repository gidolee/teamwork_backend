import tsParser from '@typescript-eslint/parser';

export default [
    {
        rules: {
            semi: 'error',
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
