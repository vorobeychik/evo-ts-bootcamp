module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
         project: './tsconfig.json',
    },
  rules: {
     "no-underscore-dangle":"off",
     "import/prefer-default-export":"off",
  }
};