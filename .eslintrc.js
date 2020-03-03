module.exports = {
  parserOptions: { "ecmaVersion": 2019 },
  // sourceType:'module',
  extends: [
    'airbnb-base',
    // 'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
  },
  rules: {
    'radix': 0,
    'no-unused-vars': [0],
    'no-console':0,
    'no-plusplus':0,
    'array-callback-return':0,
    'func-names':0,
    'consistent-return':0,
    'no-async-promise-executor':0
  },
  settings: {
  },
};
