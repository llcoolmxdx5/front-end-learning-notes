module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-recommended-vue',
  ],
  plugins: ['stylelint-order'],
  ignoreFiles: ['node_modules', '**/*.tsx', '**/*.jsx'],
  overrides: [
    {
      files: '**/*.less',
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'color-function-notation': 'legacy',
  },
};
