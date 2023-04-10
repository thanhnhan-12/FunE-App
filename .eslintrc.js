module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      js: true
    },
  },
  env: {
    'react-native/react-native': true,
  },
  plugins: ['react-native'],
  extends: ['plugin:import/recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    "import/core-modules": ["react-native"]
  },
  rules: {
    'react/jsx-uses-vars': 'error',
    'import/no-unresolved': 'error',
    "react/prop-types": "off",
    'import/named': 'off',
    "no-unused-vars": 'warn',
    "react-native/no-inline-styles": 'off',
    "react-native/no-color-literals": 'off',
    "react-native/sort-styles": 'off'
  }
};
