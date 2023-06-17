module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard-with-typescript',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint', 'stylelint-scss'],
  rules: {
    'max-len': [2, 100],
    'max-params': [2, 3],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'off',
      },
    ],
  },
  'comma-dangle': 0,
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
}
