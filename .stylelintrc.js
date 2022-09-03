module.exports = {
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('stylelint-config-css-modules'),
  ],
  plugins: [require.resolve('stylelint-order')],
  ignoreFiles: ['node_modules', '**/*.tsx', '**/*.jsx'],
  customSyntax: require.resolve('postcss-less'),
  rules: {
    'color-function-notation': 'legacy',
  },
};
