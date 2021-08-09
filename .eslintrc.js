module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'no-trailing-spaces': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@next/next/no-img-element': 'off',
    'import/no-unresolved': [2, { ignore: ['@'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
