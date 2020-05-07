module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "require-atomic-updates": "off",
    "semi": "off",
    'dot-notation': "off",
    'no-path-concat': "off",
    "space-before-function-paren": "off",
    "comma-dangle": "off"
  }
};
