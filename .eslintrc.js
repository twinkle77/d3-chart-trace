module.exports = {
  "parser": "babel-eslint",
  "root": true,
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "extends": [
    "airbnb-base"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error", "never"],
    "space-before-function-paren": ["error", "always"],
    "import/no-unresolved": [0],
    "no-process-env": [0],
    "import/prefer-default-export": [0],
    "no-unused-expressions": [0],
    "no-underscore-dangle": [0],
    "no-debugger": [0],
    "class-methods-use-this": [0]
  }
};
