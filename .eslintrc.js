module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-var': [
      'error',
    ],
    'comma-dangle': [
      'error',
      {
        'objects': 'always-multiline',
        'arrays': 'always-multiline',
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'key-spacing': [
      'error',
      {
        'afterColon': true,
        'mode': 'minimum',
      },
    ],
    // override
    'vue/max-attributes-per-line': 0,
  },
};
